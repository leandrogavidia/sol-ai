import React, { AnchorHTMLAttributes, ClassAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

export function MkLink(props: ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) {
    return (
        <a href={props.href} target="_blank">{props.children}</a>
    )
}