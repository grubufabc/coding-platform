import { Submission } from "../../../models/Submission";
import { b64_to_utf8 } from "../../../utils";
import { BaseSubmissionHandler } from "./base-submission-handler";
import { StdoutState } from "./stdout-state";


export class CompileOutputHandler extends BaseSubmissionHandler {
    handle(submission: Submission, setStdout: React.Dispatch<React.SetStateAction<StdoutState>>){
        if (submission.compile_output) {
            setStdout({
                message: `Error: ${b64_to_utf8(submission.compile_output)}`,
                error: true
            })
        }
        else super.handle(submission, setStdout)
    }
}