import { StyleClassHelper } from '@ui5/webcomponents-react-base/lib/StyleClassHelper';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/lib/usePassThroughHtmlProps';
import { useDeprecateRenderMethods } from '@ui5/webcomponents-react-base/lib/hooks';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import React, { FC, forwardRef, ReactNode, ReactNodeArray, RefObject, useCallback, useState } from 'react';
import { createComponentStyles } from '@ui5/webcomponents-react-base/lib/createComponentStyles';
import { ClassProps } from '../../interfaces/ClassProps';
import { CommonProps } from '../../interfaces/CommonProps';
import styles from './FilterBar.jss';

export interface FilterBarPropTypes extends CommonProps {
  renderVariants?: () => JSX.Element;
  renderSearch?: () => JSX.Element;
  variants?: ReactNode;
  search?: ReactNode;
  children: ReactNode | ReactNodeArray;
}

interface FilterBarInternalProps extends FilterBarPropTypes, ClassProps {}

const useStyles = createComponentStyles(styles, { name: 'FilterBar' });

/**
 * <code>import { FilterBar } from '@ui5/webcomponents-react/lib/FilterBar';</code>
 */
const FilterBar: FC<FilterBarPropTypes> = forwardRef((props: FilterBarPropTypes, ref: RefObject<HTMLDivElement>) => {
  const { children } = props as FilterBarInternalProps;
  const [showFilters, setShowFilters] = useState(true);
  const search = useDeprecateRenderMethods(props, 'renderSearch', 'search');
  const variants = useDeprecateRenderMethods(props, 'renderVariants', 'variants');

  const classes = useStyles();

  const handleHideFilterBar = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  const filterAreaClasses = StyleClassHelper.of(classes.filterArea);
  if (showFilters) {
    filterAreaClasses.put(classes.filterAreaOpen);
  } else {
    filterAreaClasses.put(classes.filterAreaClosed);
  }

  const passThroughProps = usePassThroughHtmlProps(props);

  return (
    <div ref={ref} className={classes.outerContainer} {...passThroughProps}>
      <div className={classes.filterBarHeader}>
        {variants}
        {search && <div className={classes.vLine}> {search} </div>}
        <div className={classes.headerRowRight}>
          <Button onClick={handleHideFilterBar} design={ButtonDesign.Transparent}>
            {showFilters ? 'Hide Filter Bar' : 'Show Filter Bar'}
          </Button>
        </div>
      </div>
      <div className={filterAreaClasses.valueOf()}>{children}</div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
export { FilterBar };
