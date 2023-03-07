import ContactForm from "../../components/page-components/contact-us/contact-form";

const ContactPage = () => {
  return (
    <section className="flex flex-col md:flex-row gap-6">
      <div className="text-center md:text-right gap-6 flex flex-col w-full md:w-1/2">
        <h1 className="text-lg underline font-bold md:text-3xl">כותרת כלשהי</h1>
        <p className="md:max-w-xl mx-auto md:mx-0 md:text-lg font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat labore
          voluptate perferendis expedita debitis sed sit enim impedit, at eum
          exercitationem, fugit nihil! Repellendus aspernatur animi est ipsa,
          amet facilis.
        </p>
        <div>
          <h2 className="font-bold underline text-lg md:text-xl mb-3">
            דרכים נוספות:
          </h2>
          <ul className="flex items-center gap-6 md:gap-3 flex-wrap md:flex-col md:items-start justify-center">
            <li>דרך כלשהי</li>
            <li>דרך כלשהי</li>
            <li>דרך כלשהי</li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
