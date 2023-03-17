import * as Yup from "yup";

export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false,
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es válido").required("Obligatorio"),
        password: Yup.string().required("Obligatorio"),
        repeatPassword: Yup.string().required("Obligatorio").oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true),
    });
}