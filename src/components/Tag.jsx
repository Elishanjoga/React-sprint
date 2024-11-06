export default function Tag({ value, removeQueryParam = null, key = null, className, ...props }) {
  return (
    <span key={key} className={`inline-flex items-center gap-x-0.5 rounded-full bg-gray px-2 py-1 text-xs font-medium text-white mx-4 ${className}`} {...props}>
      {value}
      {removeQueryParam && (
        <button type='button' className='group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20' onClick={() => removeQueryParam(key)}>
          <span className='sr-only'>Remove</span>
          <svg viewBox='0 0 14 14' className='h-3.5 w-3.5 stroke-white'>
            <path d='M4 4l6 6m0-6l-6 6' />
          </svg>
          <span className='absolute -inset-1' />
        </button>
      )}
    </span>
  );
}
