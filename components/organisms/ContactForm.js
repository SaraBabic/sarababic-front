'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { sendMail } from '@/lib/actions/mail';
import Field from '@/components/molecules/Form/Field';
import SubmitButton from '@/components/atoms/SubmitButton';
import { cn } from '@/lib/helpers/classnames';
import AppContext from '@/lib/context/app';
import Container from '@/components/organisms/Layout/Container';
import ConditionalWrapper from '@/components/organisms/Layout/ConditionalWrapper';

const ContactFormSchema = Yup.object().shape({
    firstName: Yup.string().required('Dies ist ein Pflichtfeld'),
    lastName: Yup.string().required('Dies ist ein Pflichtfeld'),
    email: Yup.string().email('Keine gültige E-Mail-Adresse').required('Dies ist ein Pflichtfeld'),
    phoneNumber: Yup.string(),
    subject: Yup.string().required('Dies ist ein Pflichtfeld'),
    message: Yup.string().required('Dies ist ein Pflichtfeld'),
});

const ContactForm = ({ container = true }) => {
    const formRef = useRef();
    const pathname = usePathname();
    const { appState } = useContext(AppContext);
    const [status, setStatus] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSubmit = async (values, { setSubmitting, setTouched, setErrors, resetForm }) => {
        setShowErrorMessage(false);
        setStatus('pending');

        try {
            const sendMailResponse = await sendMail({
                appState,
                formData: {
                    pagePath: pathname,
                    fields: [
                        {
                            label: 'Vorname',
                            value: values?.firstName,
                        },
                        {
                            label: 'Nachname',
                            value: values?.lastName,
                        },
                        {
                            label: 'E-Mail',
                            value: values?.email,
                        },
                        {
                            label: 'Telefonnummer',
                            value: values?.phoneNumber,
                        },
                        {
                            label: 'Betreff',
                            value: values?.subject,
                        },
                        {
                            label: 'Nachricht',
                            value: values?.message,
                        },
                    ],
                },
                template: 'contact/internal',
            });

            if (sendMailResponse?.status === 200) {
                setStatus('success');
                resetForm();
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.log(err);
            setStatus('error');
        }
    };

    useEffect(() => {
        if (status === 'error') {
            setShowErrorMessage(true);
        }

        if (status === 'error' || status === 'success') {
            // Reset to default after time
            setTimeout(function () {
                setStatus('init');
            }, 3000);
        }
    }, [status]);

    /**
     * Scroll to first error in form
     * @param {*} errors
     */
    const scrollToError = (errors) => {
        const firstError = Object.keys(errors)[0];
        const errorElement = formRef.current.querySelector(`#${firstError}`);

        if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <ConditionalWrapper condition={container} wrapper={(children) => <Container>{children}</Container>}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    subject: '',
                    message: '',
                }}
                validationSchema={ContactFormSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => {
                    if (isSubmitting && Object.keys(errors)?.length) {
                        scrollToError(errors);
                    }

                    return (
                        <Form ref={formRef}>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <Field id="firstName" label="Vorname *" placeholder="Ihr Vorname" />
                                <Field id="lastName" label="Nachname *" placeholder="Ihr Nachname" />
                                <Field id="email" label="E-Mail *" placeholder="Ihre E-Mail Adresse" className="sm:col-span-2" />
                                <Field id="phoneNumber" label="Telefonnummer" placeholder="Ihre Telefonnummer" className="sm:col-span-2" />
                                <Field id="subject" label="Betreff *" placeholder="Betreff" className="sm:col-span-2" />
                                <Field id="message" label="Nachricht *" placeholder="Ihre Nachricht" className="sm:col-span-2" as="textarea" rows="5" />
                            </div>

                            <div className="text-xs mt-4">* Pflichtfelder</div>

                            <div className="mt-4 flex justify-end">
                                <button type="submit" className="btn">
                                    <SubmitButton status={status} text="Absenden" successText="Gesendet" errorText="Fehler" />
                                </button>
                            </div>

                            <div
                                className={cn('mt-4 text-red-600 opacity-0 transition-opacity text-right', {
                                    'opacity-100': showErrorMessage,
                                })}
                            >
                                Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </ConditionalWrapper>
    );
};

export default ContactForm;
