---
name: Options list
category: Lists and tables
keywords:
  - options list
  - choices
  - decision
  - list
  - list of tags
  - list of collections
  - collections lists
  - collection lists
  - list selection
---

# Options List

The options list component lets you create a list of grouped items that
merchants can pick from. This can include single selection or multiple selection
of options. Options list usually appears in a popover, and sometimes in a modal
or a sidebar. Options lists are styled differently than
[choice lists](/components/forms/choice-list) and should not be used within a form, but as a standalone menu.

---

## Best practices

The options list component should:

- Be placed on its own inside a container. Usually the container behaves like a
  menu, as it does with [popover](/components/overlays/popover). Don’t
  place other components within the same container.
- Not be used when a [select component](/components/forms/select) will do.

---

## Content guidelines

### Options lists

Each item in an options list should be clear and descriptive.

<!-- usagelist -->

#### Do

Traffic referrer source

#### Don’t

Source

<!-- end -->

---

## Examples

### Simple options list

Use for a group of similar selectable items when only one should be selectable at once.

```jsx
class OptionsListExample extends React.Component {
  state = {selected: []};

  render() {
    return (
      <Card>
        <OptionsList
          title="Inventory Location"
          onChange={(updated) => {
            this.setState({selected: updated});
          }}
          options={[
            {value: 'byward_market', label: 'Byward Market'},
            {value: 'centretown', label: 'Centretown'},
            {value: 'hintonburg', label: 'Hintonburg'},
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={this.state.selected}
        />
      </Card>
    );
  }
}
```

### Multiple options list

Use when you have a group of similar selectable items and more than one item can be selected at once.

```jsx
class OptionsListExample extends React.Component {
  state = {selected: []};

  render() {
    return (
      <Card>
        <OptionsList
          title="Manage sales channels availability"
          onChange={(updated) => {
            this.setState({selected: updated});
          }}
          options={[
            {value: 'online_store', label: 'Online Store'},
            {value: 'messenger', label: 'Messenger'},
            {value: 'facebook', label: 'Facebook'},
            {value: 'wholesale', label: 'Wholesale'},
            {value: 'buzzfeed', label: 'BuzzFeed'},
          ]}
          selected={this.state.selected}
          allowMultiple
        />
      </Card>
    );
  }
}
```

### Options list with sections

Use sections when you have multiple groups of similar selectable items.

```jsx
class OptionsListExample extends React.Component {
  state = {selected: []};

  render() {
    return (
      <Card>
        <OptionsList
          onChange={(updated) => {
            this.setState({selected: updated});
          }}
          sections={[
            {
              options: [
                {value: 'type', label: 'Sale item type'},
                {value: 'kind', label: 'Sale kind'},
              ],
            },
            {
              title: 'Traffic',
              options: [
                {value: 'source', label: 'Traffic referrer source'},
                {value: 'host', label: 'Traffic referrer host'},
                {value: 'path', label: 'Traffic referrer path'},
              ],
            },
          ]}
          selected={this.state.selected}
          allowMultiple
        />
      </Card>
    );
  }
}
```

### Options list in a popover

Use when a set of selections won’t fit in the available screen space.

```jsx
class OptionsListExample extends React.Component {
  state = {
    selected: [],
    popoverActive: false,
  };

  togglePopover = () => {
    this.setState(({popoverActive}) => {
      return {popoverActive: !popoverActive};
    });
  };

  render() {
    const activator = <Button onClick={this.togglePopover}>Options</Button>;

    return (
      <div style={{height: '275px'}}>
        <Popover
          active={this.state.popoverActive}
          activator={activator}
          onClose={this.togglePopover}
        >
          <OptionsList
            title="Inventory Location"
            onChange={(updated) => {
              this.setState({selected: updated});
            }}
            options={[
              {value: 'byward_market', label: 'Byward Market'},
              {value: 'centretown', label: 'Centretown'},
              {value: 'hintonburg', label: 'Hintonburg'},
              {value: 'westboro', label: 'Westboro'},
              {value: 'downtown', label: 'Downtown'},
            ]}
            selected={this.state.selected}
          />
        </Popover>
      </div>
    );
  }
}
```

---

## Related components

- To render a list of actions,
  [use the action list component](/components/actions/action-list)
- To create a list of grouped radio buttons or checkboxes,
  [use the choice list component](/components/forms/choice-list)
- For a basic version of option list as a single choice menu,
  [use the select component](/components/forms/select)