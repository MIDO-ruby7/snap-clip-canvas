import type { ToolbarProps } from "../types/fabricCanvas";

const Toolbar: React.FC<ToolbarProps> = ({tools}) => {
  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-10">
      {tools.map((tool, index) => (
        <li>
          <button
            key={index}
            onClick={tool.onClick}
            className="tooltip btn btn-square"
            data-tip={tool.content}
          >
            {tool.icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Toolbar;
