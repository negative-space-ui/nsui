import {
  CloseButton,
  type CloseButtonProps,
  IconButton,
  type IconButtonProps
} from '@negative-space/button'
import { Input, type InputProps } from '@negative-space/input'
import {
  Popover,
  type PopoverProps,
  usePopover,
  type UsePopoverOptions
} from '@negative-space/popover'
import { cn, Search, useNSUI } from '@negative-space/system'
import React from 'react'

import {
  SearchBarSuggestionItem,
  type SearchBarSuggestionItemProps
} from './SearchBarSuggestionItem'

export type SearchBarPopoverProps = Omit<
  PopoverProps,
  'children' | 'className' | 'style' | 'ref' | 'popover'
> &
  Omit<UsePopoverOptions, 'overlay' | 'showArrow' | 'open' | 'onOpenChange'>

export interface SearchBarProps extends Omit<
  InputProps,
  'classNames' | 'styles' | 'type' | 'suffix'
> {
  classNames?: {
    root?: InputProps['classNames']
    clearButton?: CloseButtonProps['classNames']
    searchButton?: IconButtonProps['classNames']
    suggestion?: {
      popover?: PopoverProps['classNames']
      item?: SearchBarSuggestionItemProps['classNames']
    }
  }
  styles?: {
    root?: InputProps['styles']
    clearButton?: CloseButtonProps['styles']
    searchButton?: IconButtonProps['styles']
    suggestion?: {
      popover?: PopoverProps['styles']
      item?: SearchBarSuggestionItemProps['styles']
    }
  }
  showClearButton?: boolean
  suggestions?: SearchBarSuggestionItemProps[]
  popoverProps?: SearchBarPopoverProps
  onClear?: () => void
  onSearch?: () => void
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      classNames,
      styles,
      showClearButton,
      suggestions = [],
      popoverProps,
      value,
      onClear,
      onSearch,
      onChange,
      onFocus,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()

    const [inputValue, setInputValue] = React.useState(value ?? '')
    const [suggestionsOpen, setSuggestionsOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(-1)

    const listboxId = React.useId()

    const popover = usePopover({
      placement: 'bottom-start',
      offset: { mainAxis: 0, crossAxis: -1 },
      trapFocus: false,
      showArrow: false,
      ...popoverProps,
      open: suggestionsOpen,
      onOpenChange: setSuggestionsOpen
    })

    const filteredSuggestions = React.useMemo(() => {
      const query = String(inputValue).trim().toLowerCase()

      if (!query) {
        return []
      }

      return suggestions.filter((suggestion) => {
        if (typeof suggestion.children !== 'string') {
          return false
        }

        return suggestion.children.toLowerCase().includes(query)
      })
    }, [inputValue, suggestions])

    React.useEffect(() => {
      setInputValue(value ?? '')
    }, [value])

    React.useEffect(() => {
      setSuggestionsOpen(filteredSuggestions.length > 0)
      setActiveIndex(-1)
    }, [filteredSuggestions])

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        popover.referenceRef(node)

        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [popover.referenceRef, ref]
    )

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        onChange?.(event)
      },
      [onChange]
    )

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (filteredSuggestions.length > 0) {
          setSuggestionsOpen(true)
        }

        onFocus?.(event)
      },
      [filteredSuggestions.length, onFocus]
    )

    const focusSuggestion = React.useCallback(
      (index: number) => {
        const suggestion = filteredSuggestions[index]

        if (!suggestion?.id) {
          return
        }

        const element = document.getElementById(suggestion.id)

        if (!element) {
          return
        }

        setActiveIndex(index)
        element.focus()

        element.scrollIntoView({
          block: 'nearest'
        })
      },
      [filteredSuggestions]
    )

    const handleInputKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event)

        if (event.defaultPrevented || filteredSuggestions.length === 0) {
          return
        }

        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault()

            if (!suggestionsOpen) {
              setSuggestionsOpen(true)
            }

            focusSuggestion(activeIndex < filteredSuggestions.length - 1 ? activeIndex + 1 : 0)

            break
          }

          case 'ArrowUp': {
            event.preventDefault()

            if (!suggestionsOpen) {
              setSuggestionsOpen(true)
            }

            focusSuggestion(activeIndex > 0 ? activeIndex - 1 : filteredSuggestions.length - 1)

            break
          }

          case 'Escape': {
            if (!suggestionsOpen) {
              return
            }

            event.preventDefault()
            event.stopPropagation()

            setSuggestionsOpen(false)
            setActiveIndex(-1)

            break
          }

          default:
            break
        }
      },
      [onKeyDown, filteredSuggestions, suggestionsOpen, activeIndex, focusSuggestion]
    )

    const handleSuggestionKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>, index: number) => {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault()
            focusSuggestion(index < filteredSuggestions.length - 1 ? index + 1 : 0)

            break
          }

          case 'ArrowUp': {
            event.preventDefault()

            if (index === 0) {
              const input = document.querySelector<HTMLInputElement>(
                `[aria-controls="${listboxId}"]`
              )
              input?.focus()
              setActiveIndex(-1)

              break
            }
            focusSuggestion(index - 1)

            break
          }

          case 'Enter': {
            event.preventDefault()
            const suggestion = filteredSuggestions[index]
            if (suggestion?.id) {
              document.getElementById(suggestion.id)?.click()
            }
            setSuggestionsOpen(false)
            setActiveIndex(-1)

            break
          }

          case 'Escape': {
            event.preventDefault()
            event.stopPropagation()
            const input = document.querySelector<HTMLInputElement>(`[aria-controls="${listboxId}"]`)
            input?.focus()
            setSuggestionsOpen(false)
            setActiveIndex(-1)

            break
          }

          default:
            break
        }
      },
      [filteredSuggestions, focusSuggestion, listboxId]
    )

    const handleClear = React.useCallback(() => {
      setInputValue('')
      setActiveIndex(-1)
      setSuggestionsOpen(false)

      onClear?.()
      popover.close()
    }, [onClear, popover.close])

    const activeDescendantId = activeIndex >= 0 ? filteredSuggestions[activeIndex]?.id : undefined

    const isInputFocused =
      typeof document !== 'undefined' && document.activeElement?.getAttribute('role') === 'combobox'

    return (
      <>
        <Input
          ref={setRefs}
          {...props}
          value={inputValue}
          role="combobox"
          aria-expanded={suggestionsOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={isInputFocused ? activeDescendantId : undefined}
          enterKeyHint="search"
          data-has-suggestions={suggestionsOpen || undefined}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleInputKeyDown}
          suffix={
            <>
              {showClearButton && (
                <CloseButton
                  onClick={handleClear}
                  data-has-value={Boolean(inputValue)}
                  classNames={{
                    root: cn(
                      `${global.prefixCls}-search-bar-clear-button`,
                      classNames?.clearButton?.root
                    ),
                    ...classNames?.clearButton
                  }}
                  styles={styles?.clearButton}
                />
              )}

              <IconButton
                onClick={onSearch}
                classNames={{
                  root: cn(
                    `${global.prefixCls}-search-bar-icon-button`,
                    classNames?.searchButton?.root
                  ),
                  ...classNames?.searchButton
                }}
                styles={styles?.searchButton}
              >
                <Search />
              </IconButton>
            </>
          }
          classNames={{
            root: cn(`${global.prefixCls}-search-bar`, classNames?.root?.root),
            ...classNames?.root
          }}
          styles={{
            suffix: {
              display: 'flex',
              ...styles?.root?.suffix
            },
            ...styles?.root
          }}
        />

        <Popover
          popover={popover}
          id={listboxId}
          role="listbox"
          classNames={classNames?.suggestion?.popover}
          styles={styles?.suggestion?.popover}
          animation="none"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <SearchBarSuggestionItem
              {...suggestion}
              id={suggestion.id}
              role="option"
              tabIndex={0}
              aria-selected={index === activeIndex}
              data-active={index === activeIndex || undefined}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onKeyDown={(event) => handleSuggestionKeyDown(event, index)}
              classNames={classNames?.suggestion?.item}
              styles={styles?.suggestion?.item}
              key={suggestion.id}
            />
          ))}
        </Popover>
      </>
    )
  }
)

SearchBar.displayName = 'SearchBar'
