const localeNumber = Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 })

const formatRupiah = nominal => "Rp." + localeNumber.format(nominal)
