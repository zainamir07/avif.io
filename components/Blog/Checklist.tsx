interface Props {
  items: string[];
}

export default function Checklist(props: Props) {
  const { items } = props;

  return (
    <ul className="my-3">
      {items.map((item: any, index: any) => (
        <li className="flex items-baseline mb-2" key={index}>
          <span className="flex justify-center items-center p-1 mr-3 w-4 h-4 bg-red-700 rounded-md text-tiny">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
