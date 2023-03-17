import React, { useState } from 'react';
import "./RegisterForm.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./RegisterForm.form";

const authController = new Auth();

export function RegisterForm(props) {
    const { openLogin } = props
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setError("");
                console.log(formValue);
                await authController.register(formValue);
                openLogin();
            } catch (error) {
                setError("Error en el servidor");
            }
        }
    })

    return (
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                name='email'
                type='email'
                onChange={formik.handleChange}
                placeholder='Correo electrónico'
                value={formik.values.email}
                error={formik.errors.email} />

            <Form.Input
                name='password'
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='Contraseña'
                error={formik.errors.password} />

            <Form.Input
                name='repeatPassword'
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                type='password'
                placeholder='Repetir contraseña' />

            <Form.Checkbox
                name='conditionsAccepted'
                onChange={(_, data) => formik.setFieldValue("conditionsAccepted", data.checked)}
                checked={formik.values.conditionsAccepted}
                error={formik.errors.conditionsAccepted}
                label='He leído y acepto las políticas de privacidad' />

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                Crear cuenta
            </Form.Button>

            <p className='register-form__error'>{error}</p>
        </Form>
    );
}
