import { useFormik } from "formik";
import * as Yup from 'yup';
import ContactEmailTemplate from "./ContactEmailTemplate";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "That's an awesome name, but it's too long! Can you use a shorter one?")
    .required('Sorry, but the name is required! I need to know who you are'),
  email: Yup.string().email('Are you sure this is an email?')
    .required('Sorry, but the email is required! I need to know how to contact you'),
  message: Yup.string()
    .min(2, "That's it? I expected a bit more...")
    .max(500, 'Wow, that is a lot of text! Can we start with a shorter one for now?')
    .required('Sorry, but the message is required! I need to know what you want to tell me'),
});

export default function Form() {
  const { handleSubmit, errors, isSubmitting, handleChange, values, resetForm } = useFormik({
    validationSchema,
    initialValues: {
      name: 'Peyman',
      email: 'salam@peyman.me',
      message: 'Hello!',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch('/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const data = await response.json();
  
        if (data.success) {

          resetForm();
        } else {
          console.log("Server Error:", data);
        }
  
      } catch (error) {
        console.log("Network Error:", error);
      }
  
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ContactEmailTemplate name="Reza Hasani" email="reza@gmail.com" message="This invitation was intended for zenorocha .This invite was sent from 204.13.186.218 located in São Paulo, Brazil. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us."  />
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          Name
          <input type="text" className="rounded" name="name" onChange={handleChange}
         value={values.name} />
         {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </label>
        <label className="flex flex-col gap-1">
          Email
          <input name="email" onChange={handleChange}
         value={values.email} className="rounded" />
         {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </label>
      </div>
      <label className="flex flex-col gap-1">
        Message
        <textarea name="message" onChange={handleChange}
         value={values.message} rows={8} className="rounded" />
         {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </label>
      <div className="flex justify-end">
        <button className="bg-primary inline-flex px-4 py-2 text-white rounded" disabled={isSubmitting}>Send</button>
      </div>
    </form>
  );
}