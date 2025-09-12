import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <SignUp appearance={{theme:dark}} />
    </div>
)
}