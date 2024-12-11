import { forwardRef, useMemo } from 'react';

import { PaymailAutocompleteProps } from './types';
import { useAutocomplete } from '@mui/base';
import { useContacts } from '@/providers';
import styled from '@emotion/styled';
import { colors, sizes } from '@/styles';
import { PaymailInput } from './PaymailInput';

export const PaymailAutocomplete = forwardRef<HTMLInputElement, PaymailAutocompleteProps>(
  ({ children, paymailValue, onPaymailChange, ...props }, ref) => {
    const { contacts } = useContacts();

    const contactsPaymails = useMemo(() => contacts?.map((c) => c.paymail) ?? [], [contacts]);

    const isSelected = useMemo(
      () => contactsPaymails.find((c) => c === paymailValue),
      [contactsPaymails, paymailValue],
    );

    const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
      id: 'paymail-autocomplete',
      options: !isSelected && paymailValue != '' ? contactsPaymails : [],
      autoHighlight: true,
      inputValue: paymailValue,
      onInputChange: (_, value) => {
        onPaymailChange(value);
      },
      freeSolo: true,
      openOnFocus: false,
    });

    return (
      <div {...getRootProps()}>
        <PaymailInput {...props} inputProps={getInputProps()} ref={ref}>
          {children}

          {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as string[]).map((option, index) => {
                return (
                  <li {...getOptionProps({ option, index })} key={index}>
                    {option}
                  </li>
                );
              })}
            </Listbox>
          ) : null}
        </PaymailInput>
      </div>
    );
  },
);

PaymailAutocomplete.displayName = 'PaymailAutocomplete';

const Listbox = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 1;
    position: absolute;
    list-style: none;
    background-color: ${colors.thirdBackground};
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: ${colors.secondaryBackground} ${colors.primaryBackground};
    box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
    border-radius: ${sizes(1)};

    max-height: 200px;
    border: 1px solid rgba(227, 227, 227, 0.25);

    & li.Mui-focused {
        background-color: ${colors.textHover};
        color: white;
        cursor: pointer;
    }

    & li {
    background-color: ${colors.thirdBackground};
    padding: ${sizes(1)};
},
`;
