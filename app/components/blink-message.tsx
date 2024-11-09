"use client";

import { Action, ActionConfig, Blink, useActionsRegistryInterval } from "@dialectlabs/blinks";
import { Message } from "ai";
import { useEffect, useState } from "react";

export function BlinkMessage({
  adapter,
  message,
}: {
  message: Message;
  adapter: ActionConfig;
}) {
  const [action, setAction] = useState<Action | null>(null);
  const { isRegistryLoaded } = useActionsRegistryInterval();

  useEffect(() => {
    const getAction = async (m: Message) => {
      if (m.toolInvocations) {
        const actionUrl = m.toolInvocations[0].args.actionUrl;
        const action = await Action.fetch(actionUrl).catch(
          () => null
        );

        action?.setAdapter(adapter);

        setAction(action);
      }
    };

    getAction(message);
  }, [adapter, message]);

  return (
    <div className="w-full max-w-[446px] mx-auto pr-6">
      {action && isRegistryLoaded ? (
        <Blink
          action={action}
          websiteText={new URL(action.url)?.hostname}
          stylePreset="x-dark"
        />
      ) : (
        ""
      )}
    </div>
  );
}
