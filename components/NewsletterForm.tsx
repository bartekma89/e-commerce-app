import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

const newsletterFormSchema = yup.object({
  email: yup.string().email().required(),
});

type NewsletterFormData = yup.InferType<typeof newsletterFormSchema>;

const useAddToNewsletterMutatuon = () =>
  useMutation("add-to-newsletter", async ({ email }: { email: string }) => {
    await fetch("http://localhost:3000/api/hello/", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(newsletterFormSchema),
  });

  const { mutate } = useAddToNewsletterMutatuon();

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
        Newsletter
      </label>
      <input
        {...register("email")}
        id="email"
        className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
        placeholder="email@email.com"
        type="email"
      />
      {errors.email && (
        <span role="alert" className="text-red-500 font-bold text-sm block">
          {errors.email.message}
        </span>
      )}
      <button
        className="relative inline-block group focus:outline-none focus:ring mt-4"
        type="submit"
      >
        <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-yellow-300 group-hover:translate-y-0 group-hover:translate-x-0"></span>

        <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
          Add to the Newsletter
        </span>
      </button>
    </form>
  );
}

export default NewsletterForm;
