interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-forest-300">{icon}</div>}
      <h3 className="heading-md mb-2 text-text-primary">{title}</h3>
      {description && <p className="body-md mb-6 text-text-secondary">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="ui-lg rounded-md bg-forest-900 px-6 py-2 text-white hover:bg-forest-800"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
