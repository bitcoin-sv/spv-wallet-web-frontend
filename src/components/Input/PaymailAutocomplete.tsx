import { forwardRef, useMemo } from 'react';

import { PaymailAutocompleteProps } from './types';
import useAutocomplete from '@mui/base/useAutocomplete';
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onMouseDown: _, ...rootProps } = getRootProps(); //omit onMouseDown to allow a free select of text in the input

    return (
      <PaymailInput ref={ref} {...props} rootProps={rootProps} {...getInputProps()}>
        {children}

        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((contactPaymail, index) => {
              const p = contactPaymail as string;
              return (
                <li key={index} {...getOptionProps({ option: p, index })}>
                  {p}
                </li>
              );
            })}
          </Listbox>
        ) : null}
      </PaymailInput>
    );
  },
);

PaymailAutocomplete.displayName = 'PaymailAutocomplete';

const Listbox = styled('ul')(() => ({
  width: '100%',
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: colors.primaryBackground,
  overflowX: 'hidden',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: `${colors.secondaryBackground} ${colors.primaryBackground}`,
  boxShadow: '0 2px 4px rgba(0,0,0,.25)',
  borderRadius: sizes(1),

  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
  '& li': {
    padding: sizes(1),
  },
}));
