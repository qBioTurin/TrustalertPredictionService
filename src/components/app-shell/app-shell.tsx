"use client";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import logo from "@/assets/logo.png";
import classes from "./app-shell.module.css";
import Image from "next/image";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  const pages = [
    { name: "Home", url: "/" },
    { name: "Model Info", url: "/model-info" },
  ];

  const links_desktop = pages.map((page, index) => (
    <Link key={index} className={classes.link_desktop} href={page.url}>
      {page.name}
    </Link>
  ));

  const links_mobile = pages.map((page, index) => (
    <Link key={index} className={classes.link} href={page.url} onClick={toggle}>
      <span>{page.name}</span>
    </Link>
  ));

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
        <Group h="100%" px="md" style={{ marginLeft: "3%", marginRight: "3%" }}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title style={{ color: "#03a8f4" }} order={5}>
              Trust Alert
            </Title>
            <Group justify="space-between" visibleFrom="md">
              <Title style={{ color: "#12688d" }} order={4} ta="center">
                TrustAlert is a project <br /> funded by
              </Title>
              <Image src={logo} alt="logo" />
            </Group>
            <Group ml="xl" gap={0} visibleFrom="md">
              {links_desktop}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="lg" px={4}>
        {links_mobile}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
