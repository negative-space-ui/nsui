import { AlertProps, AlertVariant } from '@negative-space/alert'

export type NotificationVariant = 'default' | 'success' | 'error' | 'info' | 'warning'

export interface NotificationProps extends Omit<AlertProps, 'onClose' | 'variant'> {
  duration?: number
  showProgress?: boolean
  autoClose?: boolean
}

export type NotificationVariantConfig = Partial<NotificationProps>

export type NotificationVariantsConfig = Partial<
  Record<NotificationVariant, NotificationVariantConfig>
>

export function mergeNotificationProps(
  variantConfig: NotificationVariantConfig | undefined,
  notification: NotificationProps
): NotificationProps {
  return {
    ...variantConfig,
    ...notification,
    classNames: {
      ...variantConfig?.classNames,
      ...notification.classNames
    }
  }
}

export function toAlertVariant(variant: NotificationVariant): AlertVariant {
  return variant === 'default' ? 'neutral' : variant
}
