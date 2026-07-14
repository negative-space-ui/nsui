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
  classNames?: {
    root?: string
    content?: {
      root?: string
      prefix?: string
      iconWrapper?: string
      icon?: string
      info?: InfoProps['classNames']
      suffix?: string
      closeButton?: CloseButtonProps['classNames']
      tooltip?: TooltipProps['classNames']
    }
    progressBar?: string
  }
  styles?: {
    root?: React.CSSProperties
    content?: {
      root?: React.CSSProperties
      prefix?: React.CSSProperties
      iconWrapper?: React.CSSProperties
      icon?: React.CSSProperties
      info?: InfoProps['styles']
      suffix?: React.CSSProperties
      closeButton?: CloseButtonProps['styles']
      tooltip?: TooltipProps['styles']
    }
    progressBar?: React.CSSProperties
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
  rootProps?: flexProps
  contentProps?: flexProps
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
          className={cn(`${global.prefixCls}-alert-icon`, classNames?.content?.icon)}
          style={styles?.content?.icon}
        />
      ) : null)
    return (
      <>
        <Flex
          {...rootProps}
          ref={ref}
          className={cn(`${global.prefixCls}-alert`, classNames?.root)}
          data-variant={variant}
          style={{ position: 'relative', ...styles?.root }}
        >
          <Flex
            {...contentProps}
            className={cn(`${global.prefixCls}-alert-content`, classNames?.content?.root)}
            style={styles?.content?.root}
          >
            <div
              className={cn(`${global.prefixCls}-alert-prefix`, classNames?.content?.prefix)}
              style={styles?.content?.prefix}
            >
              {prefix}
            </div>

            <div
              className={cn(
                `${global.prefixCls}-alert-icon-wrapper`,
                classNames?.content?.iconWrapper
              )}
              style={styles?.content?.iconWrapper}
            >
              {renderedIcon}
            </div>

            <Info
              heading={heading}
              description={description}
              classNames={classNames?.content?.info}
              styles={styles?.content?.info}
            />

            <div
              className={cn(`${global.prefixCls}-alert-suffix`, classNames?.content?.suffix)}
              style={styles?.content?.suffix}
            >
              {suffix}
            </div>

            {Closable && (
              <CloseButton
                ref={tooltip.referenceRef}
                {...tooltip.getReferenceProps()}
                classNames={classNames?.content?.closeButton}
                styles={styles?.content?.closeButton}
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
          <Tooltip
            tooltip={tooltip}
            classNames={classNames?.content?.tooltip}
            styles={styles?.content?.tooltip}
          >
            {CloseTitle}
          </Tooltip>
        )}
      </>
    )
  }
)

Alert.displayName = 'Alert'
