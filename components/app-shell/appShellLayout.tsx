"use client";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./appShellLayout.module.css";
import Link from "next/link";

export function AppShellLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      styles={{
        header: { backgroundColor: "white" },
        navbar: { backgroundColor: "#242b33" },
        main: { backgroundColor: "#c1dae7" },
      }}
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title style={{ color: "#242b33" }}>Trustalert</Title>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Link className={classes.link_desktop} href={"/"}>
                Home
              </Link>
              {/* <Link className={classes.link_desktop} href={"/"}>
                Home
              </Link> */}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="lg" px={4}>
        <Link className={classes.link} href={"/"}>
          <span>Home</span>
        </Link>
        {/* <Link className={classes.link} href={"/"}>
          <span>Home</span>
        </Link> */}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
