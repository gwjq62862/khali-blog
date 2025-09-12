'use client'
import { SignIn } from '@clerk/nextjs'

import { dark } from '@clerk/themes'

export default function Page() {
 

    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignIn appearance={{ baseTheme: dark }} signUpUrl="/sign-up" />
        </div>
    )
}