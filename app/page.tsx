
import { ContextOption } from "./components/context-option";
import { QuestionItem } from "./components/question-item";

export default async function Home() {
  const contextOptionList = [
    "Projects & communities",
    "Hackathones",
    "Blinks",
    "More to come soon..."
  ]

  const questionList = [
    {
      title: "What is Sol AI?",
      content: "Sol AI is an AI chatbot that empowers users to learn about the Solana ecosystem. Whether you're a beginner or a seasoned pro, Sol AI helps you navigate and understand Solana, and makes onboarding new users seamless."
    },
    {
      title: "Can Sol AI generate images, or is its function limited to providing information?",
      content: "Sol AI, based on a large language model (LLM), specializes in processing and generating text. Therefore, its primary function is to provide information and answer questions, and it is not designed to create images."
    },
    {
      title: "Is Sol AI limited to providing information about Solana?",
      content: "No, Sol AI can provide information about other blockchains and topics beyond Solana. What sets Sol AI apart is that it has been optimized and connected with specialized and up-to-date information and projects within the Solana ecosystem, such as Blinks."
    },
  ]
  return (
    <>
      <section className="mt-16 flex flex-col justify-center items-start text-left">
        <h1 className="text-4xl font-bold">The AI of Solana</h1>
        <h2 className="text-xl font-normal mt-4 mb-7">AI-powered Solana virtual assistant</h2>
        <p className="text-base font-light">Sol AI is the bridge that connects people with the Solana ecosystem: projects, communities, hackathons, blinks, and much more. Our goal is to facilitate learning about the ecosystem and help onboard more users. To achieve this, we use an LLM assistant that allows anyone to obtain up-to-date information about Solana projects and innovations.</p>
      </section>

      <section className="w-full md:grid md:grid-cols-2 md:gap-x-10">
        <div className="mt-16">
          <h2 className="text-4xl font-bold">Mission</h2>
          <p className="text-base font-light mt-4">Accelerate the learning and onboarding process for people on Solana.</p>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-bold">Vision</h2>
          <p className="text-base font-light mt-4">To be the leading virtual assistant for Solana.</p>
        </div>
      </section>


      <section className="w-full my-20 flex flex-col justify-center items-start text-left md:grid md:grid-cols-2 md:gap-x-10 md:my-24 border-y-2 border-y-zinc-800 py-8">
        <div>
          <h2 className="text-4xl font-bold">Specialized context in Solana</h2>
          <h3 className="text-xl font-normal mt-4">We keep adding</h3>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-y-5 mt-12 md:mt-0">
          {
            contextOptionList.map((item) => <ContextOption text={item} key={item} />)
          }
        </div>
      </section>

      <section className="flex flex-col justify-center items-start text-left md:grid md:grid-cols-[1fr_2fr] md:gap-x-10">
        <div>
          <h2 className="text-4xl font-bold">Sol AI FAQs</h2>
          <h3 className="text-xl font-normal mt-4 md:mt-0">Frequently asked questions</h3>

        </div>
        <div className="w-full flex flex-col justify-center items-start gap-y-5 my-12 md:mt-0">
          {
            questionList.map(({ title, content }) => <QuestionItem title={title} content={content} key={title} />)
          }
        </div>
      </section>
    </>
  );
}
