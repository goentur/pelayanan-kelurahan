import {
	Building,
	ChartPie,
	FileCheck2,
	FileMinus2,
	FileSearch,
	FileText,
	HandCoins,
	Key,
	MapPinHouse,
	MapPinned,
	Medal,
	Package,
	Send,
	Settings,
	Timer,
	UserCheck2,
	UserRoundCog,
	Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/Components/nav-main"
import { NavSecondary } from "@/Components/nav-secondary"
import { NavUser } from "@/Components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const {user, permissions, satuan_kerja} : any = usePage().props.auth;
	const data = {
		user: {
			name: user.name,
			email: user.email,
		},
		menuDashboard: [
			{
				title: "Realisasi",
				url: "dashboard.realisasi.index",
				icon: ChartPie,
				permission: 'dashboard-realisasi',
			},
		],
		menuTransaksi: [
			{
				title: "Penyampaian",
				url: "transaksi.penyampaian.index",
				icon: Building,
				permission: 'penyampaian-index',
			},
			{
				title: "Laporan Penyampaian",
				url: "transaksi.laporan-penyampaian.index",
				icon: Send,
				permission: 'laporan-penyampaian-index',
			},
		],
		menuMaster: [
			{
				title: "Satuan Kerja",
				url: "master.satuan-kerja.index",
				icon: Building,
				permission: 'satuan-kerja-index',
			},
			{
				title: "Jabatan",
				url: "master.jabatan.index",
				icon: Medal,
				permission: 'jabatan-index',
			},
			{
				title: "Penyampaian Keterangan",
				url: "master.penyampaian-keterangan.index",
				icon: FileText,
				permission: 'penyampaian-keterangan-index',
			},
			{
				title: "Pegawai",
				url: "master.pegawai.index",
				icon: Medal,
				permission: 'pegawai-index',
			},
			{
				title: "Jenis Lapor",
				url: "master.jenis-lapor.index",
				icon: Send,
				permission: 'jenis-lapor-index',
			},
		],
		menuSppt: [
			{
				title: "Data",
				url: "sppt.data.index",
				icon: FileSearch,
				permission: 'sppt-data-index',
			},
		],
		navSecondary: [
			{
				title: "Pengguna",
				url: "pengaturan.pengguna.index",
				icon: UserCheck2,
				permission: 'pengguna-index',
			},
			{
				title: "Role",
				url: "pengaturan.role.index",
				icon: UserRoundCog,
				permission: 'role-index',
			},
			{
				title: "Permission",
				url: "pengaturan.permission.index",
				icon: Key,
				permission: 'permission-index',
			},
			{
				title: "Aplikasi",
				url: "pengaturan.aplikasi.index",
				icon: Settings,
				permission: 'aplikasi-index',
			},
		],
	}
	return (
	<Sidebar variant="inset" {...props}>
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" asChild>
					<Link href={route('beranda')}>
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<MapPinHouse className="size-4" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{appName}</span>
							<span className="truncate text-xs">{satuan_kerja.nama}</span>
						</div>
					</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent className="sidebar-scrollbar">
			<NavMain items={data.menuDashboard} title={'Dasboard'} permissions={permissions} />
			<NavMain items={data.menuTransaksi} title={'Transaksi'} permissions={permissions} />
			<NavMain items={data.menuSppt} title={'SPPT'} permissions={permissions} />
			<NavMain items={data.menuMaster} title={'Master'} permissions={permissions} />
			<NavSecondary items={data.navSecondary} permissions={permissions} className="mt-auto" />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={data.user} />
		</SidebarFooter>
	</Sidebar>
	)
}
