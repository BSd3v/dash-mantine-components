import { BoxProps } from "props/box";
import React from "react";

interface Props {
    /** Content */
    children: React.ReactNode;
    /** Target box wrapper props */
    boxWrapperProps?: BoxProps;
}

/** PopoverTarget */
const PopoverTarget = (props: Props) => {
    const { children } = props;

    return <>{children}</>;
};

PopoverTarget.defaultProps = {};

export default PopoverTarget;
