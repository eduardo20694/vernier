import {
  useForm,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { FormCard } from './Forms'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from './Form'
import { Input } from './Input'
import { Textarea } from './Textarea'

const leadSchema = z.object({
  name: z.string().min(2, 'Informe ao menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'A mensagem precisa ter ao menos 10 caracteres'),
})

type LeadFormValues = z.infer<typeof leadSchema>

function FormInputBridge<T extends FieldValues>({
  field,
  hasError,
  ...props
}: {
  field: ControllerRenderProps<T, Path<T>>
  hasError: boolean
} & Omit<React.ComponentProps<typeof Input>, 'error' | 'label' | 'hint'>) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Input
      {...field}
      {...props}
      id={formItemId}
      aria-invalid={hasError}
      aria-describedby={
        hasError ? `${formDescriptionId} ${formMessageId}`.trim() : formDescriptionId || undefined
      }
      className={cn(hasError && 'border-rust')}
    />
  )
}

function FormTextareaBridge<T extends FieldValues>({
  field,
  hasError,
  ...props
}: {
  field: ControllerRenderProps<T, Path<T>>
  hasError: boolean
} & Omit<React.ComponentProps<typeof Textarea>, 'error' | 'label' | 'hint'>) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Textarea
      {...field}
      {...props}
      id={formItemId}
      aria-invalid={hasError}
      aria-describedby={
        hasError ? `${formDescriptionId} ${formMessageId}`.trim() : formDescriptionId || undefined
      }
      className={cn(hasError && 'border-rust')}
    />
  )
}

export interface ValidatedFormProps {
  onSubmit?: (data: LeadFormValues) => void
  className?: string
}

// Formulário de contato com RHF + Zod — padrão que consumidores copiam.
// Input/Textarea têm wrapper próprio; use FormControl com <input> nativo
// ou estes bridges que sincronizam id/aria via useFormField.
export function ValidatedForm({ onSubmit, className }: ValidatedFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function handleSubmit(data: LeadFormValues) {
    onSubmit?.(data)
  }

  return (
    <FormCard
      className={className}
      title="Fale conosco"
      description="Envie uma mensagem — validação em tempo real com react-hook-form e Zod."
      footer={
        <Button
          type="submit"
          form="vernier-lead"
          variant="gradient"
          className="w-full"
          loading={form.formState.isSubmitting}
        >
          Enviar mensagem
        </Button>
      }
    >
      <Form {...form}>
        <form
          id="vernier-lead"
          className="space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormInputBridge
                  field={field}
                  hasError={!!fieldState.error}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormInputBridge
                  field={field}
                  hasError={!!fieldState.error}
                  type="email"
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                />
                <FormDescription>Usamos apenas para responder ao seu contato.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormTextareaBridge
                  field={field}
                  hasError={!!fieldState.error}
                  placeholder="Como podemos ajudar?"
                  rows={4}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormCard>
  )
}

export { leadSchema, type LeadFormValues }
