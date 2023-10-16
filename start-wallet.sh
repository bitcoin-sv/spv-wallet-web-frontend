#!/bin/bash

reset='\033[0m'
choice=''

function ask_for_choice() {
    local prompt="$1"
    local options=("${@:2}")

    echo -e "$prompt"
    for (( i = 0; i < ${#options[@]}; i++ )); do
        echo "$((i+1)). ${options[i]}"
    done


    read -p "> " choice

    while ! [[ "$choice" =~ ^[0-9]+$ ]] || (( choice < 1 || choice > ${#options[@]} )); do
        echo -e "\033[0;31mInvalid choice! Please select a valid option.$reset"
        read -p "> " choice
    done
}

function ask_for_yes_or_no() {
    local prompt="$1"
    echo -e "$prompt"

    local response
    read -p "(y/n)> " response

    while ! [[ "$response" =~ ^(yes|no|y|n)$ ]]; do
        echo -e "\033[0;31mInvalid response! Please enter 'yes' or 'no'.$reset"
        read -p "> " response
    done

    if [[ "$response" =~ ^(yes|y)$ ]]; then
        choice="true"
    else
        choice="false"
    fi
}

compose_plugin=false
if command docker compose version &> /dev/null; then
	compose_plugin=true
fi

function docker_compose_up() {
	if [ compose_plugin == true ]; then
		docker compose -f docker/docker-compose.yml up $1
	else
		docker-compose -f docker/docker-compose.yml up $1
	fi
}

# Welcome message
echo -e "\033[0;33m\033[1mWelcome in Bux Wallet!$reset"

while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -db|--database)
        database="$2"
        shift
        ;;
        -c|--cache)
        cache="$2"
        shift
        ;;
        -bs|--bux-server)
        bux_server="$2"
        shift
        ;;
        -env|--environment)
        environment="$2"
        shift
        ;;
        -b|--background)
        background="$2"
        shift
        ;;
        -x|--xpub)
        admin_xpub="$2"
        shift
        ;;
        -p|--xpriv)
        admin_xpriv="$2"
        shift
        ;;
        -l|--load)
        load_config="true"
        shift
        ;;
        -bwf|--bux-wallet-frontend)
        bux_wallet_frontend="$2"
        shift
        ;;
        -bwb|--bux-wallet-backend)
        bux_wallet_backend="$2"
        shift
        ;;
        -h|--help)
        echo -e "\033[1mUsage: ./start-wallet.sh [OPTIONS]$reset"
        echo ""
        echo "This script helps you to run Bux wallet and Bux server with your preferred database and cache storage."
        echo ""
        echo -e "Options:$reset"
        echo -e "<----------   BUX WALLET SECTION"
        echo -e "  -bwf,  --bux-wallet-frontend\t Whether the bux-wallet-frontend should be run - true/false$reset"
        echo -e "  -bwb,  --bux-wallet-backend\t Whether the bux-wallet-backend should be run - true/false$reset"
        echo -e "  -p,    --xpriv\t\t\t Define admin xPriv$reset"
        echo -e ""
        echo -e "<----------   BUX SERVER SECTION"
        echo -e "  -db,  --database\t\t Define database - postgresql, mongodb, sqlite$reset"
        echo -e "  -c,   --cache\t\t\t Define cache storage - freecache(in-memory), redis$reset"
        echo -e "  -bs,  --bux-server\t\t Whether the bux-server should be run - true/false$reset"
        echo -e "  -env, --environment\t\t Define bux-server environment - development/staging/production$reset"
        echo -e "  -b,   --background\t\t Whether the bux-server should be run in background - true/false$reset"
        echo -e "  -x,   --xpub\t\t\t Define admin xPub$reset"
        echo -e "  -l,   --load\t\t\t Load .env.config file and run bux-server with its settings$reset"
        exit 1;
        shift
        ;;
        *)
        ;;
    esac
    shift
done

if [ "$load_config" == "true" ]; then
    if [ -f ./docker/.env.config ]; then
        echo "File .env.config exists."

            while IFS= read -r line; do
                if [[ "$line" =~ ^(BUX_DATASTORE__ENGINE=) ]]; then
                    value="${line#*=}"
                    database="${value//\"}"
                fi
                if [[ "$line" =~ ^(BUX_CACHE__ENGINE=) ]]; then
                    value="${line#*=}"
                    cache="${value//\"}"
                fi
                if [[ "$line" =~ ^(RUN_BUX_SERVER=) ]]; then
                    value="${line#*=}"
                    bux_server="${value//\"}"
                fi
                if [[ "$line" =~ ^(BUX_ENVIRONMENT=) ]]; then
                    value="${line#*=}"
                    environment="${value//\"}"
                fi
                if [[ "$line" =~ ^(RUN_BUX_SERVER_BACKGROUND=) ]]; then
                    value="${line#*=}"
                    background="${value//\"}"
                fi
                if [[ "$line" =~ ^(RUN_WITH_XPUB_FROM_JSON=) ]]; then
                    value="${line#*=}"
                    xpub_from_json="${value//\"}"
                fi
                if [[ "$line" =~ ^(BUX_AUTHENTICATION__ADMIN_KEY=) ]]; then
                    value="${line#*=}"
                    admin_xpub="${value//\"}"
                fi
                if [[ "$line" =~ ^(BUX_ADMIN_XPRIV=) ]]; then
                    value="${line#*=}"
                    admin_xpriv="${value//\"}"
                fi
                if [[ "$line" =~ ^(RUN_BUX_WALLET_FRONTEND=) ]]; then
                    value="${line#*=}"
                    bux_wallet_frontend="${value//\"}"
                fi
                if [[ "$line" =~ ^(RUN_BUX_WALLET_BACKEND=) ]]; then
                    value="${line#*=}"
                    bux_wallet_backend="${value//\"}"
                fi



            done < "./docker/.env.config"
        else
            echo "File .env.config does not exist."
        fi
fi

# <----------   BUX WALLET SECTION

if [ "$bux_wallet_frontend" == "" ]; then
    ask_for_yes_or_no "Do you want to run Bux-wallet-frontend?"
    bux_wallet_frontend="$choice"
    echo -e "\033[0;33m[DEBUG] bux_wallet_frontend: $bux_wallet_frontend$reset"
fi

if [ "$bux_wallet_backend" == "" ]; then
    ask_for_yes_or_no "Do you want to run Bux-wallet-backend?"
    bux_wallet_backend="$choice"
    echo -e "\033[0;33m[DEBUG] bux_wallet_backend: $bux_wallet_backend$reset"
fi

if [ "$load_config" != "true" ]; then
  # Create the .env.config file
  echo -e "\033[0;32mCreating .env.config file...$reset"
  echo -n > "./docker/.env.config"
  {
  echo "RUN_BUX_WALLET_FRONTEND=\"$bux_wallet_frontend\""
  echo "RUN_BUX_WALLET_BACKEND=\"$bux_wallet_backend\""
  } >> ./docker/.env.config
fi

# <----------   BUX SERVER SECTION

if [ "$bux_server" == "" ]; then
    ask_for_yes_or_no "Do you want to run Bux-server?"
    bux_server="$choice"
    echo -e "\033[0;33m[DEBUG] bux_server: $bux_server$reset"
fi


if [ "$bux_server" == "true" ]; then
    if [ "$environment" == "" ]; then
        ask_for_choice "Select your environment:" "development" "staging" "production"
        case $choice in
            1) environment="development";;
            2) environment="staging";;
            3) environment="production";;
        esac
        echo -e "\033[0;33m[DEBUG] environment: $environment$reset"
    fi

    if [ "$database" == "" ]; then
        ask_for_choice "Select your database:" "postgresql" "mongodb" "sqlite"
        case $choice in
            1) database="postgresql";;
            2) database="mongodb";;
            3) database="sqlite";;
        esac
        echo -e "\033[0;33m[DEBUG] database: $database$reset"
    fi

    if [ "$cache" == "" ]; then
        ask_for_choice "Select your cache storage:" "freecache" "redis"
        case $choice in
            1) cache="freecache";;
            2) cache="redis";;
        esac
        echo -e "\033[0;33m[DEBUG] cache: $cache$reset"
    fi

  if [ "$admin_xpub" == "" ] && [ "$xpub_from_json" != "true" ]; then
      # Ask for admin xPub choice
      echo -e "\033[1mDefine admin xPub $reset"
      echo -e "\033[4mLeave empty to use the one from selected environment config file $reset"
      read -p "> " admin_input
      if [[ -n "$admin_input" ]]; then
          admin_xpub=$admin_input
      else
          xpub_from_json="true"
      fi
  fi

  if [ "$admin_xpriv" == "" ] && [ "$bux_wallet_backend" == "true" ]; then
    echo -e "\033[1mDefine admin xPriv $reset"
    echo -e "\033[4mLeave empty to use the default one $reset"
    read -p "> " admin_input
    if [[ -n "$admin_input" ]]; then
      admin_xpriv=$admin_input
    else
      admin_xpriv="xprv9s21ZrQH143K3A7d7FojiC2JoGqcTH2jsfqPKiP4uqoW1v17ZHaEZnX873FBrW4grcp66Rff8yU7deDCcxLDsrFy3Nkcsotv7PmHNhTAd43"
    fi
  fi

    if [ "$background" == "" ]; then
        ask_for_yes_or_no "Do you want to run Bux-server in the background?"
        background="$choice"
        echo -e "\033[0;33m[DEBUG] background: $background$reset"
    fi

  if [ "$load_config" != "true" ]; then
    {
      echo "RUN_BUX_SERVER=\"$bux_server\""
      echo "BUX_CACHE__ENGINE=\"$cache\""
      echo "BUX_DATASTORE__ENGINE=\"$database\""
      echo "BUX_ENVIRONMENT=\"$environment\""
      echo "RUN_BUX_SERVER_BACKGROUND=\"$background\""
    } >> ./docker/.env.config


    # Add additional settings to .env.config file based on the selected database
    if [ "$database" == "postgresql" ]; then
        echo 'BUX_SQL__HOST="bux-postgresql"' >> ./docker/.env.config
        echo 'BUX_SQL__NAME="postgres"' >> ./docker/.env.config
        echo 'BUX_SQL__USER="postgres"' >> ./docker/.env.config
        echo 'BUX_SQL__PASSWORD="postgres"' >> ./docker/.env.config
    fi

    # Add additional settings to .env.config file based on the selected database
    if [ "$database" == "mongodb" ]; then
        echo 'BUX_MONGODB__URI="mongodb://mongo:mongo@bux-mongodb:27017/"' >> ./docker/.env.config
    fi

    # Add additional settings to .env.config file based on the selected cache storage
    if [ "$cache" == "redis" ]; then
        echo 'BUX_REDIS__URL="redis://redis:6379"' >> ./docker/.env.config
    fi

    if [ "$admin_xpub" != "" ]; then
      echo "BUX_AUTHENTICATION__ADMIN_KEY=\"$admin_xpub\"" >> ./docker/.env.config
    fi

    if [ "$xpub_from_json" == "true" ]; then
      echo 'RUN_WITH_XPUB_FROM_JSON="true"' >> ./docker/.env.config
    fi

    if [ "$admin_xpriv" != "" ]; then
      echo "BUX_ADMIN_XPRIV=\"$admin_xpriv\"" >> ./docker/.env.config
    fi
  fi

  echo -e "\033[0;32mStarting bux-server services with docker-compose...$reset"
  if [ "$cache" == "redis" ]; then
		echo -e "\033[0;37mdocker compose up -d bux-redis$reset"
		docker_compose_up "-d bux-redis"
  fi
  
  if [ "$database" != "sqlite" ]; then
		echo -e "\033[0;37mdocker compose up -d bux-'$database'$reset"
		docker_compose_up "-d bux-$database"
  fi
fi

cmd="docker compose -f ./docker/docker-compose.yml up "

if [ "$bux_wallet_frontend" == "true" ]; then
  cmd+="bux-wallet-frontend "
fi

if [ "$bux_wallet_backend" == "true" ]; then
  cmd+="bux-wallet-backend "
fi

if [ "$bux_server" == "true" ]; then
  if [ "$background" == "true" ]; then
    if [ "$cmd" != "docker compose -f ./docker/docker-compose.yml up " ]; then
      echo -e "It is not possible to run "
      echo -e "\033[0;37mdocker compose -f ./docker/docker-compose.yml up bux-server$reset"
			docker_compose_up "-d bux-server"
    else
      echo -e "\033[0;37mdocker compose -f ./docker/docker-compose.yml up -d bux-server$reset"
			docker_compose_up "bux-server"
    fi
  else
    cmd+="bux-server "
  fi
fi

if [ "$cmd" != "docker compose -f ./docker/docker-compose.yml up " ]; then
  echo -e "\033[0;37m$cmd$reset"
  eval "$cmd"
fi

function cleanup {
	echo -e "\033[0;31mStopping all services...$reset"
	cd ./docker ||  exit 1;
	if [ $compose_plugin == true ]; then
		docker compose stop
	else
		docker-compose stop
	fi
	echo -e "\033[0;31mExiting program...$reset"
}

trap cleanup EXIT
