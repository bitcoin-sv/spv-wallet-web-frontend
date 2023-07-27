#!/bin/bash

reset='\033[0m'

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
#        -s|--server-url)
#        server-url="$2"
#        shift
#        ;;
#        -p|--paymail-domain)
#        paymail-domain="$2"
#        shift
#        ;;
        -h|--help)
        echo -e "\033[1mUsage: ./start-walletr.sh [OPTIONS]$reset"
        echo ""
        echo "This script helps you to run Bux wallet and Bux server with your preferred database and cache storage."
        echo ""
        echo -e "Options:$reset"
        echo -e "<----------   BUX WALLET SECTION"
        echo -e "  -bwf,  --bux-wallet-frontend\t Whether the bux-server should be run - true/false$reset"
        echo -e "  -bwb,  --bux-wallet-backend\t Whether the bux-server should be run - true/false$reset"
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
                if [[ "$line" =~ ^(BUX_AUTHENTICATION__ADMIN_KEY=) ]]; then
                    value="${line#*=}"
                    admin_xpub="${value//\"}"
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
    # Ask for bux-wallet-frontend choice
    echo -e "\033[1mDo you want to run Bux-wallet-frontend?$reset"
    echo "1. YES"
    echo "2. NO"
    echo -e "\033[4mAny other number ends the program $reset"
    read -p "> " bux_wallet_frontend_choice

    # Validate bux-server choice
    case $bux_wallet_frontend_choice in
        1) bux_wallet_frontend="true";;
        2) bux_wallet_frontend="false";;
        *) echo -e "\033[0;31mExiting program...$reset"; exit 1;;
    esac
fi

if [ "$bux_wallet_backend" == "" ]; then
    # Ask for bux-wallet-backend choice
    echo -e "\033[1mDo you want to run Bux-wallet-backend?$reset"
    echo "1. YES"
    echo "2. NO"
    echo -e "\033[4mAny other number ends the program $reset"
    read -p "> " bux_wallet_backend_choice

    # Validate bux-server choice
    case $bux_wallet_backend_choice in
        1) bux_wallet_backend="true";;
        2) bux_wallet_backend="false";;
        *) echo -e "\033[0;31mExiting program...$reset"; exit 1;;
    esac
fi

# <-------------------------------------------------------------------------

#if [ "$bux_wallet_backend" == "true" ]; then
#  if [ "$server_url" == "" ]; then
#    # Ask for bux-wallet-backend choice
#    echo -e "\033[1mSpecify Bux server url: $reset"
#    echo -e "\033[4mLeave empty to use bux-server container $reset"
#    read -p "> " server_url_input
#    if [[ -n "$server_url_input" ]]; then
#      server_url=$server_url_input
#    else
#      server_url="bux-server:3003/v1"
#    fi
#  fi
#fi

# <-------------------------------------------------------------------------


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
    # Ask for bux-server choice
    echo -e "\033[1mDo you want to run Bux-server?$reset"
    echo "1. YES"
    echo "2. NO"
    echo -e "\033[4mAny other number ends the program $reset"
    read -p "> " bux_server_choice

    # Validate bux-server choice
    case $bux_server_choice in
        1) bux_server="true";;
        2) bux_server="false";;
        *) echo -e "\033[0;31mExiting program... Stopping additional services... $reset"; docker compose stop; exit 1;;
    esac
fi

if [ "$bux_server" == "true" ]; then

  if [ "$environment" == "" ]; then
    # Ask for environment choice
    echo -e "\033[1mSelect your environment:$reset"
    echo "1. development"
    echo "2. staging"
    echo "3. production"
    echo -e "\033[4mAny other number ends the program $reset"
    read -p "> " environment_choice
    # Validate environment choice
    case $environment_choice in
        1) environment="development";;
        2) environment="staging";;
        3) environment="production";;
        *) echo -e "\033[0;31mExiting program... Stopping additional services... $reset"; docker compose stop; exit 1;;
    esac
  fi

  if [ "$database" == "" ]; then
      # Ask for database choice
      echo -e "\033[1mSelect your database: $reset"
      echo "1. postgresql"
      echo "2. mongodb"
      echo "3. sqlite"
      echo -e "\033[4mAny other number ends the program $reset"
      read -p "> " database_choice

      # Validate database choice
      case $database_choice in
          1) database="postgresql";;
          2) database="mongodb";;
          3) database="sqlite";;
          *) echo -e "\033[0;31mExiting program...$reset"; exit 1;;
      esac
  fi

  if [ "$cache" == "" ]; then
      # Ask for cache storage choice
      echo -e "\033[1mSelect your cache storage:$reset"
      echo "1. freecache"
      echo "2. redis"
      echo -e "\033[4mAny other number ends the program $reset"
      read -p "> " cache_storage_choice

      # Validate cache storage choice
      case $cache_storage_choice in
          1) cache="freecache";;
          2) cache="redis";;
          *) echo -e "\033[0;31mExiting program...$reset"; exit 1;;
      esac
  fi

  if [ "$admin_xpub" == "" ]; then
    if [ "$load_config" != "true" ]; then
      # Ask for admin xPub choice
      echo -e "\033[1mDefine admin xPub $reset"
      echo -e "\033[4mLeave empty to use the one from selected environment config file $reset"
      read -p "> " admin_input
      if [[ -n "$admin_input" ]]; then
          admin_xpub=$admin_input
      fi
    fi
  fi

  if [ "$background" == "" ]; then
      # Ask for background choice
      echo -e "\033[1mDo you want to run Bux-server in background? $reset"
      echo "1. YES"
      echo "2. NO"
      echo -e "\033[4mAny other number ends the program $reset"
      read -p "> " background_choice
      # Validate background choice
      case $background_choice in
          1) background="true";;
          2) background="false";;
          *) echo -e "\033[0;31mExiting program... Stopping additional services... $reset"; docker compose stop; exit 1;;
      esac
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
  fi

  echo -e "\033[0;32mStarting bux-server services with docker-compose...$reset"
  if [ "$cache" == "redis" ]; then
      echo -e "\033[0;37mdocker compose up -d bux-redis bux-'$database'$reset"
      docker compose -f ./docker/docker-compose.yml up -d bux-redis bux-"$database"
  else
      echo -e "\033[0;37mdocker compose up -d bux-'$database'$reset"
      docker compose -f ./docker/docker-compose.yml up-d bux-"$database"
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
      docker compose -f ./docker/docker-compose.yml up -d bux-server
    else
      echo -e "\033[0;37mdocker compose -f ./docker/docker-compose.yml up -d bux-server$reset"
      docker compose -f ./docker/docker-compose.yml up bux-server
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
    docker compose stop
    echo -e "\033[0;31mExiting program...$reset"
}

trap cleanup EXIT
