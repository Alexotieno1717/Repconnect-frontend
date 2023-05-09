import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "../../../../hooks/usePrevious";

export interface SingleOTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    focus?: boolean;
}

export const  SingleOTPInputComponent = (props: SingleOTPInputProps) => {
    const { focus, autoFocus, ...rest } = props;
    const prevFocus = usePrevious(focus);
    const inputRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        if (inputRef.current) {
            if (focus && autoFocus) {
                inputRef.current.focus();
            }
            if (focus && autoFocus && focus !== prevFocus) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [autoFocus,focus, prevFocus]);

    return <input ref={inputRef} {...rest}/>;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;