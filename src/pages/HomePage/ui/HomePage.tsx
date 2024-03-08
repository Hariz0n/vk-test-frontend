import { FactCard } from "@/widgets/FactCard";
import { NavIdProps, Panel, PanelHeader, Title } from "@vkontakte/vkui";
import { FC } from "react";

export const HomePage: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        <Title level="2">Найди - Тестовое на стажировку</Title>
      </PanelHeader>
      <FactCard />
    </Panel>
  );
};
