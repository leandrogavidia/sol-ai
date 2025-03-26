
import { ContextOption } from "./components/context-option";
import { Plus } from "./components/icons/plus";
import { QuestionItem } from "./components/question-item";

export default async function Home() {
  const contextOptionList = [
    "Projects & communities",
    "Hackathones",
    "Blinks"
  ]

  const questions = [
    {
      title: "",
      content: ""
    }
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
            <QuestionItem title="Question 01" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nesciunt velit illum deleniti, minus necessitatibus facilis soluta sint quibusdam facere at inventore suscipit quam quos architecto. Laboriosam nesciunt aut tenetur!" />
            
        </div>


      </section>
    </>
  );
}
