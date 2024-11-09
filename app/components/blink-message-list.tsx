"use client";

import {
  Action,
  ActionConfig,
  Blink,
  useActionsRegistryInterval,
} from "@dialectlabs/blinks";
import { Message } from "ai";
import { useEffect, useState } from "react";

export function BlinkMessageList({
  adapter,
  message,
}: {
  message: Message;
  adapter: ActionConfig;
}) {
  const [actions, setActions] = useState<Action[]>([]);
  const { isRegistryLoaded } = useActionsRegistryInterval();

  useEffect(() => {
    const getActions = async (m: Message) => {
      const tool = m.toolInvocations ? m.toolInvocations[0] : undefined;
      if (
        tool &&
        "result" in tool &&
        typeof tool.result === "object" &&
        tool.result !== null &&
        "actionUrlList" in tool.result
      ) {
        const actionUrlList = tool.result.actionUrlList;

        const newActions = await Promise.all(
          actionUrlList.map(async (actionUrl: string) => {
            const action = await Action.fetch(actionUrl).catch(() => null);
            action?.setAdapter(adapter);
            return action;
          })
        );
        setActions(newActions);
      }
    };

    getActions(message);
  }, [adapter, message]);

  return (
    <div className="grid grid-cols-2 gap-5 w-full">
      {actions.length > 0 && isRegistryLoaded
        ? actions.map((action) => (
            <Blink
              key={action.url}
              action={action}
              websiteText={new URL(action.url)?.hostname}
              stylePreset="x-dark"
            />
          ))
        : ""}
    </div>
  );
}
