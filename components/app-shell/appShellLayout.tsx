"use client";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./appShellLayout.module.css";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";

export function AppShellLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      styles={{
        header: { backgroundColor: "white" },
        navbar: { backgroundColor: "#242b33" },
        main: { backgroundColor: "#c1dae7" },
      }}
      header={{ height: 90 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" style={{marginLeft: "15%", marginRight: "15%"}}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title style={{ color: "#03a8f4" }} order={5}>Trust Alert</Title>
			<Group justify="space-between" visibleFrom="md">
			<Title style={{ color: "#12688d" }} order={4} ta="center">TrustAlert is a project <br/> funded by</Title>
			<Image src={logo} alt="logo" />
			</Group>
            <Group ml="xl" gap={0} visibleFrom="md">
              <Link className={classes.link_desktop} href={"/"}>
                Home
              </Link>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="lg" px={4}>
        <Link className={classes.link} href={"/"}>
          <span>Home</span>
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
