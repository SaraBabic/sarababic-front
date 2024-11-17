import React from 'react';
import { Field as FormikField, useFormikContext } from 'formik';

const Field = ({ id, label, placeholder, className, as = 'input', ...rest }) => {
    const { errors, touched } = useFormikContext();

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-semibold leading-6 mb-1">
                {label}
            </label>
            <FormikField
                as={as}
                id={id}
                name={id}
                placeholder={placeholder}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                {...rest}
            />

            {errors?.[id] && touched?.[id] ? <div className="text-xs text-red-500 mt-2">{errors?.[id]}</div> : null}
        </div>
    );
};

export default Field;
