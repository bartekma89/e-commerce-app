import { formatNumber } from "@/lib/helpers";
import Image from "next/image";
import { useForm } from "react-hook-form";

const countries = [
  {
    id: 1,
    name: "Poland",
  },
  {
    id: 2,
    name: "England",
  },
  {
    id: 3,
    name: "Wales",
  },
  {
    id: 4,
    name: "France",
  },
  {
    id: 5,
    name: "Belgium",
  },
  {
    id: 6,
    name: "Japan",
  },
  {
    id: 7,
    name: "Germany",
  },
  {
    id: 8,
    name: "Spain",
  },
];

const products = [
  {
    id: 1,
    name: "Vibrant Trainers",
    price: 49.99,
    color: "Blue",
    size: "UK 10",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Vibrant Trainers",
    price: 25,
    color: "Blue",
    size: "UK 10",
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
];

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardCvc: string;
  country: string;
  postalCode: string;
}

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-12 bg-white md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
                <div className="col-span-3">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                  />
                </div>

                <div className="col-span-3">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                    type="text"
                    id="email"
                    {...register("email")}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="phone"
                  >
                    Phone
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                    type="tel"
                    id="phone"
                    {...register("phone")}
                  />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block mb-1 text-sm text-gray-600">
                    Card Details
                  </legend>

                  <div className="-space-y-px bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="sr-only" htmlFor="cardNumber">
                        Card Number
                      </label>

                      <input
                        className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        id="cardCumber"
                        placeholder="Card number"
                        {...register("cardNumber")}
                      />
                    </div>

                    <div className="flex -space-x-px">
                      <div className="flex-1">
                        <label className="sr-only" htmlFor="cardExpirationDate">
                          Expiration Date
                        </label>

                        <input
                          className="border-gray-200 relative rounded-bl-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                          type="text"
                          id="cardExpirationDate"
                          placeholder="MM / YY"
                          {...register("cardExpirationDate")}
                        />
                      </div>

                      <div className="flex-1">
                        <label className="sr-only" htmlFor="cardCvc">
                          CVC
                        </label>

                        <input
                          className="border-gray-200 relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                          type="text"
                          id="cardCvc"
                          placeholder="CVC"
                          {...register("cardCvc")}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block mb-1 text-sm text-gray-600">
                    Billing Address
                  </legend>

                  <div className="-space-y-px bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="sr-only" htmlFor="country">
                        Country
                      </label>

                      <select
                        className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5"
                        id="country"
                        autoComplete="country-name"
                        {...register("country")}
                      >
                        {countries.map((country) => (
                          <option key={country.id} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="postalCode">
                        ZIP/Post Code
                      </label>

                      <input
                        className="border-gray-200 relative rounded-b-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        id="postalCode"
                        autoComplete="postalCode"
                        placeholder="ZIP/Post Code"
                        {...register("postalCode")}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <button
                    className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="py-12 bg-gray-50 md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <div className="flex items-center">
                <span className="w-10 h-10 bg-blue-900 rounded-full"></span>
                <h2 className="ml-4 font-medium">BambooYou</h2>
              </div>

              <div className="mt-8">
                <p className="text-2xl font-medium tracking-tight">
                  {formatNumber(99.99, "pl-PL", {
                    style: "currency",
                    currency: "pln",
                  })}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  For the purchase of
                </p>
              </div>

              <div className="mt-12">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {products.map((product) => {
                      return (
                        <li
                          key={product.id}
                          className="flex items-center justify-between py-4"
                        >
                          <div className="flex items-start">
                            <Image
                              className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                              src={product.image}
                              alt={product.name}
                              layout="intrinsic"
                              width={65}
                              height={65}
                            />
                            <div className="ml-4">
                              <p className="text-sm">{product.name}</p>

                              <dl className="mt-1 space-y-1 text-xs text-gray-500">
                                <div>
                                  <dt className="inline">Color:</dt>
                                  <dd className="inline">{product.color}</dd>
                                </div>

                                <div>
                                  <dt className="inline">Size:</dt>
                                  <dd className="inline">{product.size}</dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm">
                              {formatNumber(product.price, "pl-PL", {
                                style: "currency",
                                currency: "pln",
                              })}
                              <small className="text-gray-500">
                                x{product.quantity}
                              </small>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
