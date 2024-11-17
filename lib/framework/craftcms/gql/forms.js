export const FORM_SUBMISSION_QUERY = {
    allowedMethods: ['POST'],
    operationName: 'FORM_SUBMISSION',
    query: `
        mutation FORM_SUBMISSION ($formData: String, $emailAddress: String, $subject: String, $text: String, $template: String) {
            intForms (formData: $formData, subject: $subject, text: $text, template: $template, emailAddress: $emailAddress)
        }
    `,
    resolver: (response) => {
        let data = response?.data || response?.errors || null;

        try {
            data = JSON.parse(data?.intForms);
        } catch (err) {}

        return data;
    },
};
