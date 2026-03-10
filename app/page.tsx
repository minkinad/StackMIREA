import Link from "next/link";
import { ArrowRight, Bot, Brain, Code2, Database, ExternalLink, GitPullRequest, ListChecks, Sigma } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const tracks = [
  // Keep cards in the same order as sidebar section ordering for predictable navigation.
  {
    title: "Python",
    subtitle: "Практики по OOP, тестированию и функциональному стилю",
    href: "/docs/python",
    icon: Code2
  },
  {
    title: "AI",
    subtitle: "Ноутбуки Notebook1..Notebook8 по курсу ИИ",
    href: "/docs/ai",
    icon: Bot
  },
  {
    title: "BigData",
    subtitle: "Практики по анализу данных, классификации и кластеризации",
    href: "/docs/bigdata",
    icon: Database
  },
  {
    title: "Java",
    subtitle: "24 практики по ООП, коллекциям, MVC и паттернам",
    href: "/docs/java",
    icon: Brain
  },
  {
    title: "Algorithms",
    subtitle: "Методические материалы и структурированные разборы",
    href: "/docs/algorithms",
    icon: Sigma
  }
];

const publicationRules = [
  {
    title: "Публикуй материал в нужный трек",
    description: "Размещай файл в соответствующем разделе: `python`, `ai`, `bigdata`, `java` или `algorithms`."
  },
  {
    title: "Соблюдай единый формат",
    description: "Используй понятную структуру: цель, шаги решения, код, результат и краткие выводы."
  },
  {
    title: "Оформляй кодовые примеры",
    description: "Добавляй язык в код-блоки и оставляй только воспроизводимые, проверенные фрагменты."
  },
  {
    title: "Фиксируй контекст и источники",
    description: "Если материал опирается на внешние источники, обязательно оставляй ссылки и пояснения."
  },
  {
    title: "Проверяй изменения перед PR",
    description: "Перед публикацией запускай `npm run lint` и `npm run typecheck`, чтобы не ломать сборку."
  }
];

const pullRequestLinks = [
  {
    title: "Создать Pull Request",
    href: "https://github.com/MinAleDm/StackMIREA/compare?expand=1",
    description: "Откроет форму сравнения веток и создания PR для публикации."
  },
  {
    title: "Все Pull Request",
    href: "https://github.com/MinAleDm/StackMIREA/pulls",
    description: "Список открытых и закрытых PR по проекту."
  },
  {
    title: "Открытые Pull Request",
    href: "https://github.com/MinAleDm/StackMIREA/pulls?q=is%3Apr+is%3Aopen",
    description: "Быстрый фильтр для проверки, что уже находится на ревью."
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/65 px-6 py-14 sm:px-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Brain className="size-3.5" />
            StackMIREA documentation hub
          </p>

          <h1
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground opacity-0 sm:text-6xl"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "120ms" }}
          >
            Практики и ноутбуки
            <br />
            в едином формате docs
          </h1>

          <p
            className="mt-6 max-w-3xl text-pretty text-base leading-7 text-muted-foreground opacity-0 sm:text-lg"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "220ms" }}
          >
            Учебные материалы StackMIREA: отдельные треки Python, AI, BigData, Java и Algorithms. Каждая страница
            оформлена как техническая документация с кодом, разбором и привязкой к исходникам.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "320ms" }}
          >
            <Link href="/docs" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Открыть документацию
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs/python"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-border/80 bg-background/70 sm:w-auto")}
            >
              Python трек
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {tracks.map((track, index) => {
          const Icon = track.icon;
          return (
            <Link
              key={track.title}
              href={track.href}
              className="group rounded-2xl border border-border/70 bg-card/70 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
              style={{ animation: "fade-up 660ms ease-out forwards", animationDelay: `${120 + index * 100}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-border/70 bg-background/70 p-2 text-muted-foreground transition-colors group-hover:text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{track.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{track.subtitle}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                Перейти
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <ListChecks className="size-3.5" />
            Правила публикации
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Как публиковать материалы в StackMIREA</h2>
          <ol className="mt-5 space-y-4">
            {publicationRules.map((rule, index) => (
              <li key={rule.title} className="flex gap-3 rounded-xl border border-border/70 bg-background/60 p-4">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{rule.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{rule.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <GitPullRequest className="size-3.5" />
            Публикация через PR
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Ссылки на Pull Request</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Для публикации открывай PR с изменениями в документации. В описании укажи, что именно добавлено и в каком
            треке лежит материал.
          </p>

          <div className="mt-5 space-y-3">
            {pullRequestLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </span>
                <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
