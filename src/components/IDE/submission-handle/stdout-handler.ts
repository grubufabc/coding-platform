import { Submission } from "../../../models/submission";
import { b64_to_utf8 } from "../../../utils";
import { BaseSubmissionHandler } from "./base-submission-handler";
import { StdoutState } from "./stdout-state";


export class StdoutHandler extends BaseSubmissionHandler {
    handle(submission: Submission, setStdout: React.Dispatch<React.SetStateAction<StdoutState>>) {
        if (submission.stdout) {
            setStdout({
                message: b64_to_utf8(submission.stdout),
                error: false
            })
        }
        else super.handle(submission, setStdout)
    }
}
