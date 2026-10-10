import Link from "next/link"
import { Star } from "@/components/site/illustrations"

// not-found does not receive route params, so this page is shown in both languages.
export default function NotFound() {
  return (
    <div className="wrap grid min-h-[80vh] place-items-center pt-32 pb-24 text-center">
      <div>
        <Star className="mx-auto size-12 text-gold" />
        <h1 className="mt-6 text-5xl font-extrabold md:text-7xl">This page left the stage.</h1>
        <p lang="ar" dir="rtl" className="mt-4 font-heading text-2xl font-bold">
          هذه الصفحة غادرت المسرح.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/en" className="btn btn-gold">
            Back to home
          </Link>
          <Link href="/ar" lang="ar" className="btn btn-line">
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
