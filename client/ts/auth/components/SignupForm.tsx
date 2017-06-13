import * as React from 'react';
import {FormErrors, FormProps, reduxForm, SubmitHandler as ISubmitHandler} from 'redux-form';
import {Alert, Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import Input from '../../common/forms/fields/Input';
import * as validators from '../../common/forms/validators';


export interface IFormData {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

interface IFormProps extends FormProps<IFormData, {}, {}> {}

interface ISignupFormProps extends IFormProps {
    onSubmit?: (data: IFormData) => void;
    authError: string | null;
}

function validate(formData: IFormData): FormErrors<IFormData> {
    const { email, password, passwordConfirm } = formData;
    let errors: IFormData = {};

    errors.email = validators.email(email);
    errors.password = validators.required(password);
    errors.passwordConfirm = validators.equal(password, passwordConfirm, 'Passwords are not identical');

    return errors;
}


@reduxForm<IFormData, ISignupFormProps, {}>({
    form: 'SignupForm',
    validate
})
class SignupFormC extends React.Component<ISignupFormProps, {}> {

    private renderAuthError(): JSX.Element {
        return <Alert>Signup Failed, try again.</Alert>;
    }

    private submit: ISubmitHandler<IFormData, ISignupFormProps, {}> = (formData: IFormData): void => {
        this.props.onSubmit && this.props.onSubmit(formData);
    };

    public render(): JSX.Element {
        const { handleSubmit, authError } = this.props;
        return (
            <Form horizontal onSubmit={ handleSubmit && handleSubmit(this.submit) }>
                { authError ? this.renderAuthError() : null }

                <Input name="email" label="Email"/>
                <Input name="password" label="Password" type="password"/>
                <Input name="passwordConfirm" label="Confirm password" type="password"/>
                <Button bsStyle="primary" bsSize="lg" type="submit">Submit</Button>
            </Form>
        )
    }
}



const SignupForm = connect(undefined, {})(SignupFormC);

export default SignupForm;
