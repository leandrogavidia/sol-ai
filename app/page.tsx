
import { ContextOption } from "./components/context-option";
import { QuestionItem } from "./components/question-item";

export default async function Home() {
  const contextOptionList = [
    "Projects & communities",
    "Hackathones",
    "Blinks"
  ]

  const questionList = [
    {
      title: "What is Sol AI?",
      content: "Sol AI is an AI chatbot that empowers users to learn about the Solana ecosystem. Whether you're a beginner or a seasoned pro, Sol AI helps you navigate and understand Solana, and makes onboarding new users seamless."
    },
  ]
  return (
    <>
      <section className="mt-16 flex flex-col justify-center items-start text-left">
        <h1 className="text-4xl font-bold">The AI of Solana</h1>
        <h2 className="text-xl font-normal mt-4 mb-7">AI-powered Solana virtual assistant</h2>
        <p className="text-base font-light">Sol AI is the bridge that connects people with the Solana ecosystem: projects, communities, hackathons, blinks, and much more. Our goal is to facilitate learning about the ecosystem and help onboard more users. To achieve this, we use an LLM assistant that allows anyone to obtain up-to-date information about Solana projects and innovations.</p>
      </section>

      <section className="my-20 flex flex-col justify-center items-start text-left">
        <h2 className="text-4xl font-bold">Specialized context in Solana</h2>
        <h3 className="text-xl font-normal mt-4">We keep adding</h3>
        <div className="w-full flex flex-col justify-center items-start gap-y-5 mt-12">
          {
            contextOptionList.map((item) => <ContextOption text={item} key={item} />)
          }
        </div>
      </section>

      <section className="flex flex-col justify-center items-start text-left">
        <h2 className="text-4xl font-bold">Sol AI FAQs</h2>
        <h3 className="text-xl font-normal mt-4">Frequently asked questions</h3>
        <div className="w-full flex flex-col justify-center items-start gap-y-5 my-12">
            {
              questionList.map(({ title, content }) => <QuestionItem title={title} content={content} key={title} />)
            }
        </div>
      </section>
    </>
  );
}
