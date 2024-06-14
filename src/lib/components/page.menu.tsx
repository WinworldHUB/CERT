import {
  Flex,
  Image,
  NavLink,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUser, IconHelp } from "@tabler/icons-react";
import { FC } from "react";

export const MenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <IconGauge size="1rem" stroke={1.5} />,
  },
  {
    title: "Profile",
    icon: <IconUser size="1rem" stroke={1.5} />,
  },
  {
    title: "Help",
    icon: <IconHelp size="1rem" stroke={1.5} />,
  },
];

interface PageMenuProps {
  selectedMenuIndex: number;
  onMenuClicked: (index: number) => void;
  isLoggedIn: boolean;
}

const PageMenu: FC<PageMenuProps> = ({
  selectedMenuIndex,
  isLoggedIn,
  onMenuClicked,
}) => {
  const appTheme = useMantineTheme();

  return (
    <Flex
      px={20}
      align={"center"}
      justify={"space-between"}
      bg={appTheme.colors.palePurple[1]}
      className="shadow-sm"
    >
      <Image
        src={"/assets/images/zcgs-logo.png"}
        h={70}
        py={5}
        className="remove-bg"
      />
      <SimpleGrid cols={MenuItems.length}>
        {isLoggedIn &&
          MenuItems.map((item, index) => (
            <NavLink
              key={item.title}
              label={item.title}
              leftSection={item.icon}
              variant="filled"
              color="palePurple"
              active={index === selectedMenuIndex}
              onClick={() => onMenuClicked(index)}
            />
          ))}
      </SimpleGrid>
    </Flex>
  );
};

export default PageMenu;
