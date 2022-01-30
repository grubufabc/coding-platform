import { Chapter } from "../../../Learn/Course/interfaces/Chapter"
import TrashIcon from "../icons/TrashIcon"
import { useCourse } from "../useCourse"
import RenderEditor from "./RenderEditor"

interface ChapterVisualizerProps {
    chapter: Chapter
}

const ChapterVisualizer: React.FC<ChapterVisualizerProps> = ({ chapter }) => {
    const {
        addMarkdownSection,
        removeChapter,
        addCodeSection,
        updateChapter
    } = useCourse()

    return (
        <div className="card p-2 mb-4">
            <h4>
                <input
                    className="border-0"
                    value={chapter.title}
                    onChange={(e) => {
                        chapter.title = e.target.value
                        updateChapter()
                    }}
                />
            </h4>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-dark border-0"
                        onClick={() => addCodeSection(chapter)}
                    >
                        + Código
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-dark border-0"
                        onClick={() => addMarkdownSection(chapter)}
                    >
                        + Texto
                    </button>
                </div>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeChapter(chapter)}
                >
                    <TrashIcon />
                </button>
            </div>

            {chapter.content.map((section, index) => (
                <RenderEditor
                    key={index}
                    section={section}
                    chapter={chapter}
                />
            ))}
        </div>
    )
}

export default ChapterVisualizer
