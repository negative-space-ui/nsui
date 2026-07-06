import { CloseButton, type CloseButtonProps } from '@negative-space/button'
import { Flex, type FlexProps } from '@negative-space/flex'
import { Info, type InfoProps } from '@negative-space/info'
import { ProgressBar, type ProgressBarProps } from '@negative-space/progress-bar'
import {
  CheckCircle2,
  cn,
  Info as InfoIcon,
  TriangleAlert,
  useNSUI,
  XCircle
} from '@negative-space/system'
import { Tooltip, type TooltipProps, useTooltip } from '@negative-space/tooltip'
import React from 'react'

export type AlertVariant = 'neutral' | 'info' | 'success' | 'error' | 'warning'

const ALERT_ICONS: Partial<
  Record<AlertVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>>
> = {
  info: InfoIcon,
  success: CheckCircle2,
  error: XCircle,
  warning: TriangleAlert
}

type flexProps = Omit<FlexProps, 'className' | 'style' | 'prefix' | 'children'>

export interface AlertProps {
  rootProps?: flexProps
  contentProps?: flexProps
  classNames?: {
    root?: string
    content?: string
    prefix?: string
    iconWrapper?: string
    icon?: string
    info?: InfoProps['classNames']
    suffix?: string
    closeButton?: CloseButtonProps['classNames']
    progressBar?: string
    tooltip?: TooltipProps['classNames']
  }
  styles?: {
    root?: React.CSSProperties
    content?: React.CSSProperties
    prefix?: React.CSSProperties
    iconWrapper?: React.CSSProperties
    icon?: React.CSSProperties
    info?: InfoProps['styles']
    suffix?: React.CSSProperties
    closeButton?: CloseButtonProps['styles']
    progressBar?: React.CSSProperties
    tooltip?: TooltipProps['styles']
  }
  open?: boolean
  closable?: boolean
  onClose?: () => void
  heading: string
  description?: string
  variant?: AlertVariant
  icon?: React.ReactNode
  closeTitle?: string
  progressBar?: Omit<ProgressBarProps, 'className' | 'style'>
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  tooltip?: boolean
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      classNames,
      styles,
      open = true,
      heading,
      description,
      variant = 'neutral',
      progressBar,
      icon,
      prefix,
      suffix,
      tooltip: showTooltip,
      closeTitle,
      closable,
      onClose,
      rootProps = { direction: 'column', gap: '0' },
      contentProps = { alignItems: 'center' }
    },
    ref
  ) => {
    if (!open) return null

    const { global, components } = useNSUI()
    const tooltip = useTooltip()

    const ShowTooltip = showTooltip ?? global.tooltip
    const CloseTitle = closeTitle ?? components.modal?.closeTitle
    const Closable = closable ?? components.alert.closable

    const VariantIcon = ALERT_ICONS[variant]

    const renderedIcon =
      icon ??
      (VariantIcon ? (
        <VariantIcon
          className={cn(`${global.prefixCls}-alert-icon`, classNames?.icon)}
          style={styles?.icon}
        />
      ) : null)
    return (
      <>
        <Flex
          {...rootProps}
          ref={ref}
          className={cn(
            `${global.prefixCls}-alert ${global.prefixCls}-alert-${variant}`,
            classNames?.root
          )}
          style={{ position: 'relative', ...styles?.root }}
        >
          <Flex
            {...contentProps}
            className={cn(`${global.prefixCls}-alert-content`, classNames?.content)}
            style={styles?.content}
          >
            <div
              className={cn(`${global.prefixCls}-alert-prefix`, classNames?.prefix)}
              style={styles?.prefix}
            >
              {prefix}
            </div>

            <div
              className={cn(`${global.prefixCls}-alert-icon-wrapper`, classNames?.iconWrapper)}
              style={styles?.iconWrapper}
            >
              {renderedIcon}
            </div>

            <Info
              heading={heading}
              description={description}
              classNames={classNames?.info}
              styles={styles?.info}
            />

            <div
              className={cn(`${global.prefixCls}-alert-suffix`, classNames?.suffix)}
              style={styles?.suffix}
            >
              {suffix}
            </div>

            {Closable && (
              <CloseButton
                {...tooltip.triggerProps}
                classNames={classNames?.closeButton}
                styles={styles?.closeButton}
                onClick={onClose}
                aria-label={CloseTitle}
                title={!global.tooltip ? CloseTitle : undefined}
              />
            )}
          </Flex>

          {progressBar && progressBar.value !== undefined && (
            <ProgressBar
              {...progressBar}
              value={progressBar.value}
              className={classNames?.progressBar}
              style={styles?.progressBar}
            />
          )}
        </Flex>

        {ShowTooltip && (
          <Tooltip tooltip={tooltip} classNames={classNames?.tooltip} styles={styles?.tooltip}>
            {CloseTitle}
          </Tooltip>
        )}
      </>
    )
  }
)

Alert.displayName = 'Alert'
