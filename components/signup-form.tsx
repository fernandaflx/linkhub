import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "./password-input"
import { ComponentProps, useState } from "react"
import { signUpWithEmail, } from "@/lib/auth-client"
import { useRouter } from "next/navigation"


type SignupFormValues = {
  name: string
  email: string
  password: string
}

export function SignupForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleEmailSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const values = Object.fromEntries(formData.entries()) as SignupFormValues
    const { name, email, password } = values

    try {
      await signUpWithEmail(name, email, password)
      router.push('/dashboard')
    } catch (err: unknown) {
      setError('Não foi possível criar conta.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>
            Insira os dados abaixo e faça parte da comunidade do Linkhub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignup}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                <Input id="name" name='name' type="text" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  name='email'
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <PasswordInput
                      id="password"
                      name='password'
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirme sua senha
                    </FieldLabel>
                    <PasswordInput
                      id="confirm-password"
                      name="confirm-password"
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  A senha precisa ter ao menos 8 caracteres
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Criando conta' : 'Criar conta'}
                </Button>
                {error && (
                  <FieldDescription className="text-center text-destructive">
                    {error}
                  </FieldDescription>
                )}
                <FieldDescription className="text-center">
                  Já possui uma conta? <a href="/login">Entre agora.</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
