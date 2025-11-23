"use client"

import { ChevronDownIcon, LanguagesIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useTransition } from "react"

export function LanguageToggle() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()

  const onLanguageChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LanguagesIcon className="h-4 w-4" />}
          {locale === 'en' ? t('en') : t('id')}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange("id")}>
          {t('id')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange("en")}>
          {t('en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
