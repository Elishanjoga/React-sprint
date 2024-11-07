export default function Progress({ value, color, label }) {
  return (
    <div className='mb-4'>
      <p className='text-sm font-medium text-white'>{label}</p>
      <div aria-hidden='true'>
        <div className='overflow-hidden rounded-full bg-gray-200'>
          <div style={{ width: `${value}%` }} className={`h-2 rounded-full bg-${color}`} />
        </div>
        <p className='text-sm font-medium text-white'>{value.toFixed(2)}%</p>
      </div>
    </div>
  );
}
