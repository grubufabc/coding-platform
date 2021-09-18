import { Submission } from "../../../models/submission";
import { b64_to_utf8 } from "../../../utils";
import { BaseSubmissionHandler } from "./base-submission-handler";
import { StdoutState } from "./stdout-state";


export class StderrHandler extends BaseSubmissionHandler {
    handle(submission: Submission, setStdout: React.Dispatch<React.SetStateAction<StdoutState>>) {
        if (submission.stderr) {
            setStdout({
                message: `Error: ${b64_to_utf8(submission.stderr)}`,
                error: true
            })
        }
        else super.handle(submission, setStdout)
    }
}