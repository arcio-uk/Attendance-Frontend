import React from 'react';
import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const Select = ({
  options, label, value, onChange,
}) => (
  <div className="w-full relative">
    <div className="block mb-1 text-sm font-medium text-gray-900">{label}</div>
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button
          className="relative w-full p-2.5 text-left bg-gray-50 border-gray-300 border
           rounded-lg cursor-pointer focus-visible:ring-offset-2 text-sm hover:border-purple-500 transition-all"
        >
          <span className="block truncate">{value.title}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="w-full py-1 mt-1 absolute text-base bg-gray-50 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {options.map((option) => (
            <Listbox.Option
              key={option.key}
              value={option}
              className="cursor-default select-none py-2 pl-10 pr-4 text-md
                bg-gray-50 hover:bg-purple-500 hover:text-gray-100 transition-all z-50"
            >
              {option.title}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  </div>
);

Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  options: [],
  value: { title: 'Model box' },
  onChange: undefined,
};

export default Select;
