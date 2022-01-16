import sortBy from "lodash/sortBy";

export interface QuestionsProps {
  questions: string[];
}

export default function Questions(props: QuestionsProps) {
  let questions = props.questions.map((original) => {
    original = original.replace(/\s+/g, "+").toLowerCase();
    let short = original.replace(/\/$/, "");
    original = `https://google.com/search?q=site%3Aavif.io+${original}`;
    short = short.replace(/\+/g, " ");
    return { original, short };
  });
  questions = sortBy(questions, (s) => s.short);

  const listQuestions = questions.map((source: any, index: any) => (
    <li
      key={index}
      className="inline-block px-1 mr-1 text-red-700 rounded-md text-tiny bg-red-1000"
    >
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        Related search terms
      </h5>
      <ol>{listQuestions}</ol>
    </>
  );
}
