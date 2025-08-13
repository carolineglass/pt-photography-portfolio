import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mvgqypjj");

  if (state.succeeded) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">
            Message Sent!
          </h2>
          <p className="text-green-700">
            Thanks for reaching out! I'll get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                First Name (required)
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="form-inputs"
              />
              <ValidationError
                prefix="First Name"
                field="firstName"
                errors={state.errors}
                className="text-red-600 text-md mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Last Name (required)
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="form-inputs"
              />
              <ValidationError
                prefix="Last Name"
                field="lastName"
                errors={state.errors}
                className="text-red-600 text-md mt-1"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Email (required)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-inputs"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-600 text-md mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Subject (required)
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="form-inputs"
            />
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
              className="text-red-600 text-md mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Message (required)
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="6"
              className="form-inputs"
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-600 text-md mt-1"
            />
          </div>
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-gray-900 text-white text-md md:text-lg py-4 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
