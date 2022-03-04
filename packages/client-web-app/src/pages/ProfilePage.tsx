import React from 'react';
import styled from 'styled-components';
import {
  NavigationBar,
  ThemeColors,
  Container,
  EditNoteIcon,
  themeFont,
} from '@kotletti/uikit-web';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

type WorkBlockProps = {
  title?: string;
  position: string;
  grade: string;
  company: string;
  range: string;
  tools: string;
  softSkills: string;
  hardSkills: string;
};

type ProfileBlockProps = {
  firstName: string;
  lastName: string;
};

const StyledCardTitle = styled.span(() => ({
  ...themeFont.h1,
  color: ThemeColors.text01,
}));

const StyledCardSubject = styled.span(() => ({
  ...themeFont.h1,
  color: ThemeColors.brandSecondary,
}));

const StyledCardViewLine = styled.span(() => ({
  ...themeFont.footnote,
  color: ThemeColors.secondary60,
  margin: '0 10px 0 0',
}));

const StyledCardWriteLine = styled.span(() => ({
  ...themeFont.footnote,
  color: ThemeColors.text02,
}));

const BlockDivider: React.FC = () => (
  <Container
    width="100%"
    height="1px"
    margin="15px 0"
    backgroundColor={ThemeColors.dividerPrimary}
  />
);

const WorkBlock: React.FC<WorkBlockProps> = ({
  title,
  position,
  grade,
  range,
  company,
  tools,
  softSkills,
  hardSkills,
}) => (
  <Container width="330px">
    {title && (
      <Container
        display="flex"
        justifyContent="space-between"
      >
        <Container display="flex">
          <StyledCardTitle>{title}</StyledCardTitle>
        </Container>
        <Container display="flex">
          <EditNoteIcon fill={ThemeColors.text01} />
        </Container>
      </Container>
    )}
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Должность:</StyledCardViewLine>
      <StyledCardWriteLine>{position}</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Градация:</StyledCardViewLine>
      <StyledCardWriteLine>{grade}</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Компания:</StyledCardViewLine>
      <StyledCardWriteLine>{company}</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Период:</StyledCardViewLine>
      <StyledCardWriteLine>{range}</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Инструменты:</StyledCardViewLine>
      <StyledCardWriteLine>{tools}</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Soft skills:</StyledCardViewLine>
      <StyledCardWriteLine>
        {softSkills}
      </StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Hard skills:</StyledCardViewLine>
      <StyledCardWriteLine>
        {hardSkills}
      </StyledCardWriteLine>
    </Container>
    <BlockDivider />
  </Container>
);

const SecondBlock: React.FC = () => {
  const cardList = [
    {
      title: 'Работа',
      position: 'UX designer',
      grade: 'Junior',
      company: 'Котики',
      range: 'Январь 2020 - Январь 2021. 3 г.',
      tools:
        'Adobe Photoshop, Adobe Illustrator,Figma,Sketch',
      softSkills:
        'Умение слушать, Ведение переговоров, Командная работа, Деловое письмо,Управление стрессом',
      hardSkills:
        'Управление проектами, Design System,Проектная документация, UX Research,Яндекс.Метрика',
    },
    {
      position: 'UX designer',
      grade: 'Junior',
      company: 'Котики',
      range: 'Январь 2020 - Январь 2021. 3 г.',
      tools:
        'Adobe Photoshop, Adobe Illustrator,Figma,Sketch',
      softSkills:
        'Умение слушать, Ведение переговоров, Командная работа, Деловое письмо,Управление стрессом',
      hardSkills:
        'Управление проектами, Design System,Проектная документация, UX Research,Яндекс.Метрика',
    },
  ];
  return (
    <Container
      display="flex"
      flexDirection="column"
      margin="0 60px"
    >
      {cardList.map((i, index) => (
        <WorkBlock key={index} {...i} />
      ))}
    </Container>
  );
};

const ProfileBlock: React.FC<ProfileBlockProps> = ({
  firstName,
  lastName,
}) => (
  <Container>
    <Container
      display="flex"
      justifyContent="space-between"
    >
      <Container display="flex">
        <StyledCardTitle>
          {firstName} {lastName}
        </StyledCardTitle>
      </Container>
      <Container display="flex">
        <EditNoteIcon fill={ThemeColors.text01} />
      </Container>
    </Container>
    <Container>
      <StyledCardSubject>UX designer</StyledCardSubject>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Локация:</StyledCardViewLine>
      <StyledCardWriteLine>
        Россия, Санкт-Петербург
      </StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Возраст:</StyledCardViewLine>
      <StyledCardWriteLine>23 года</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Опыт работы:</StyledCardViewLine>
      <StyledCardWriteLine>3 года</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>
        Зарегистрирован:
      </StyledCardViewLine>
      <StyledCardWriteLine>Январь 2022</StyledCardWriteLine>
    </Container>
    <BlockDivider />
  </Container>
);

const ExpectationsBlock: React.FC = () => (
  <Container>
    <Container
      display="flex"
      justifyContent="space-between"
    >
      <Container display="flex">
        <StyledCardTitle>Ожидания</StyledCardTitle>
      </Container>
      <Container display="flex">
        <EditNoteIcon fill={ThemeColors.text01} />
      </Container>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Должность:</StyledCardViewLine>
      <StyledCardWriteLine>UX designer</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Градация:</StyledCardViewLine>
      <StyledCardWriteLine>Junior</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Зарплата:</StyledCardViewLine>
      <StyledCardWriteLine>320 000 ₽</StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>Занятость:</StyledCardViewLine>
      <StyledCardWriteLine>
        Полная занятость
      </StyledCardWriteLine>
    </Container>
    <Container margin="10px 0 0 0">
      <StyledCardViewLine>
        График работы:
      </StyledCardViewLine>
      <StyledCardWriteLine>
        Удаленная работа
      </StyledCardWriteLine>
    </Container>
  </Container>
);

const FirstBlock: React.FC = () => {
  const {
    profile: { firstName, lastName },
  } = useSelector((state: RootState) => state.user.my!);

  return (
    <Container
      display="flex"
      flexDirection="column"
      margin="0 60px"
      width="308px"
    >
      <ProfileBlock
        firstName={firstName}
        lastName={lastName}
      />
      <ExpectationsBlock />
    </Container>
  );
};

const BlockContainer: React.FC = () => (
  <Container margin="100px 60px" display="flex">
    <FirstBlock />
    <SecondBlock />
  </Container>
);

export const ProfilePage: React.FC = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      backgroundColor={ThemeColors.backgroundPrimary}
    >
      <NavigationBar navText="Профиль" />
      <BlockContainer />
    </Container>
  );
};
